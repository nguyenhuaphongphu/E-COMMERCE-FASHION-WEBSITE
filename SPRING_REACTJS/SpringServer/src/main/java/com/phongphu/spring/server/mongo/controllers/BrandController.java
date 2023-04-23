package com.phongphu.spring.server.mongo.controllers;


import com.phongphu.spring.server.mongo.models.Brand;
import com.phongphu.spring.server.mongo.repository.BrandRepository;
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
@RequestMapping("/brands")
public class BrandController {
    @Autowired
    BrandRepository brandRepository;

    @GetMapping("")
    public ResponseEntity<List<Brand>> list() {
        try {
            List<Brand> brands = new ArrayList<>(brandRepository.findAll());
            if (brands.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(brands, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            List<Brand> brands;
            Pageable paging = PageRequest.of(page, size);

            Page<Brand> pageBrands;
            pageBrands = brandRepository.findAll(paging);

            brands = pageBrands.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("items", brands);
            response.put("currentPage", pageBrands.getNumber());
            response.put("totalItems", pageBrands.getTotalElements());
            response.put("totalPages", pageBrands.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Brand> get(@PathVariable("id") String id) {
        try {
            Brand brand = brandRepository.findById(id).orElse(null);
            return new ResponseEntity<>(brand, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Brand> add(@RequestBody Brand brand) {
        try {
            brandRepository.save(brand);
            return new ResponseEntity<>(brand,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Brand> update(@PathVariable("id") String id, @RequestBody Brand brand) {
        try {
            brand.setId(id);
            brandRepository.save(brand);
            return new ResponseEntity<>(brand,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            brandRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
