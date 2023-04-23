package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.ImportOrder;
import com.phongphu.spring.server.mongo.repository.ImportOrderRepository;
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
@RequestMapping("/importOrders")
public class ImportOrderController {
    @Autowired
    ImportOrderRepository importOrderRepository;

    @GetMapping("")
    public ResponseEntity<List<ImportOrder>> list() {
        try {
            List<ImportOrder> importOrders = new ArrayList<>(importOrderRepository.findAll());
            if (importOrders.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(importOrders, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            List<ImportOrder> importOrder;
            Pageable paging = PageRequest.of(page, size);

            Page<ImportOrder> pageImportOrders;
            pageImportOrders = importOrderRepository.findAll(paging);

            importOrder = pageImportOrders.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("items", importOrder);
            response.put("currentPage", pageImportOrders.getNumber());
            response.put("totalItems", pageImportOrders.getTotalElements());
            response.put("totalPages", pageImportOrders.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ImportOrder> get(@PathVariable("id") String id) {
        try {
            ImportOrder importOrder = importOrderRepository.findById(id).orElse(null);
            return new ResponseEntity<>(importOrder, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<ImportOrder> add(@RequestBody ImportOrder importOrder) {
        try {
            importOrderRepository.save(importOrder);
            return new ResponseEntity<>(importOrder,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ImportOrder> update(@PathVariable("id") String id, @RequestBody ImportOrder importOrder) {
        try {
            importOrder.setId(id);
            importOrderRepository.save(importOrder);
            return new ResponseEntity<>(importOrder,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            importOrderRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
