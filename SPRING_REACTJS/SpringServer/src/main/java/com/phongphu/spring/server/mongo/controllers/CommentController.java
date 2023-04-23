package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.Comment;
import com.phongphu.spring.server.mongo.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/comments")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @GetMapping("")
    public ResponseEntity<List<Comment>> list() {
        try {
            List<Comment> comments = new ArrayList<>(commentRepository.findAll());
            if (comments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(comments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            List<Comment> comments;
            Pageable paging = PageRequest.of(page, size);

            Page<Comment> pageComments;
            pageComments = commentRepository.findAll(paging);

            comments = pageComments.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("items", comments);
            response.put("currentPage", pageComments.getNumber());
            response.put("totalItems", pageComments.getTotalElements());
            response.put("totalPages", pageComments.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Comment> get(@PathVariable("id") String id) {
        try {
            Comment comment = commentRepository.findById(id).orElse(null);
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Comment> add(@RequestBody Comment comment) {
        try {
            commentRepository.save(comment);
            return new ResponseEntity<>(comment,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Comment> update(@PathVariable("id") String id, @RequestBody Comment comment) {
        try {
            comment.setId(id);
            commentRepository.save(comment);
            return new ResponseEntity<>(comment,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            commentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
