package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.TypeProduct;
import com.phongphu.spring.server.mongo.repository.TypeProductRepository;
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
@RequestMapping("/typeOfProduct")
public class TypeProductController {
    @Autowired
    TypeProductRepository typeProductRepository;

    @GetMapping("")
    public ResponseEntity<List<TypeProduct>> list() {
        try {
            List<TypeProduct> typeProducts = new ArrayList<>(typeProductRepository.findAll());
            if (typeProducts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(typeProducts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            List<TypeProduct> typeProducts;
            Pageable paging = PageRequest.of(page, size);

            Page<TypeProduct> pageTypeProducts;
            pageTypeProducts = typeProductRepository.findAll(paging);

            typeProducts = pageTypeProducts.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("items", typeProducts);
            response.put("currentPage", pageTypeProducts.getNumber());
            response.put("totalItems", pageTypeProducts.getTotalElements());
            response.put("totalPages", pageTypeProducts.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeProduct> get(@PathVariable("id") String id) {
        try {
            TypeProduct typeProduct = typeProductRepository.findById(id).orElse(null);
            return new ResponseEntity<>(typeProduct, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<TypeProduct> add(@RequestBody TypeProduct typeProduct) {
        try {
            typeProductRepository.save(typeProduct);
            return new ResponseEntity<>(typeProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeProduct> update(@PathVariable("id") String id, @RequestBody TypeProduct typeProduct) {
        try {
            typeProduct.setId(id);
            typeProductRepository.save(typeProduct);
            return new ResponseEntity<>(typeProduct, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            typeProductRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
