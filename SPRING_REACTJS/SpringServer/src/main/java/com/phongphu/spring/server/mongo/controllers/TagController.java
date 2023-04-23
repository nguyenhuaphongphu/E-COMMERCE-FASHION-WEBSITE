package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.Tag;
import com.phongphu.spring.server.mongo.repository.TagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/tags")
public class TagController {
    @Autowired
    TagRepository tagRepository;

    @GetMapping("")
    public ResponseEntity<List<Tag>> list() {
        try {
            List<Tag> tags = new ArrayList<>(tagRepository.findAll());
            if (tags.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(tags, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            List<Tag> tags;
            Pageable paging = PageRequest.of(page, size);

            Page<Tag> pageTags;
            pageTags = tagRepository.findAll(paging);

            tags = pageTags.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("items", tags);
            response.put("currentPage", pageTags.getNumber());
            response.put("totalItems", pageTags.getTotalElements());
            response.put("totalPages", pageTags.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tag> get(@PathVariable("id") String id) {
        try {
            Tag tag = tagRepository.findById(id).orElse(null);
            return new ResponseEntity<>(tag, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    @PreAuthorize("hasRole('CREATETAG') or hasRole('UPDATER') or hasRole('ADMIN')")
    public ResponseEntity<Tag> add(@RequestBody Tag tag) {
        try {
            tagRepository.save(tag);
            return new ResponseEntity<>(tag,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('UPDATETAG') or hasRole('UPDATER') or hasRole('ADMIN')")
    public ResponseEntity<Tag> update(@PathVariable("id") String id, @RequestBody Tag tag) {
        try {
            tag.setId(id);
            tagRepository.save(tag);
            return new ResponseEntity<>(tag,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('DELETETAG') or hasRole('UPDATER') or hasRole('ADMIN')")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            tagRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
