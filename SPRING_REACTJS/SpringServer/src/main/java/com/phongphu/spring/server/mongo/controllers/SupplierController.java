package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.Supplier;
import com.phongphu.spring.server.mongo.repository.SupplierRepository;
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
@RequestMapping("/suppliers")
public class SupplierController {
    @Autowired
    SupplierRepository supplierRepository;

    @GetMapping("")
    public ResponseEntity<List<Supplier>> list() {
        try {
            List<Supplier> suppliers = new ArrayList<>(supplierRepository.findAll());
            if (suppliers.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(suppliers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            List<Supplier> suppliers;
            Pageable paging = PageRequest.of(page, size);

            Page<Supplier> pageSuppliers;
            pageSuppliers = supplierRepository.findAll(paging);

            suppliers = pageSuppliers.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("items", suppliers);
            response.put("currentPage", pageSuppliers.getNumber());
            response.put("totalItems", pageSuppliers.getTotalElements());
            response.put("totalPages", pageSuppliers.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> get(@PathVariable("id") String id) {
        try {
            Supplier supplier = supplierRepository.findById(id).orElse(null);
            return new ResponseEntity<>(supplier, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Supplier> add(@RequestBody Supplier supplier) {
        try {
            supplierRepository.save(supplier);
            return new ResponseEntity<>(supplier,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Supplier> update(@PathVariable("id") String id, @RequestBody Supplier supplier) {
        try {
            supplier.setId(id);
            supplierRepository.save(supplier);
            return new ResponseEntity<>(supplier,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            supplierRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
