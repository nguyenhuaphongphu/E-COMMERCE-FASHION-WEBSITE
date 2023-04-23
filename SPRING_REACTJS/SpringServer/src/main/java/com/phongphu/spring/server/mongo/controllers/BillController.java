package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.Bill;
import com.phongphu.spring.server.mongo.repository.BillRepository;
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
@RequestMapping("/bills")
public class BillController {
    @Autowired
    BillRepository billRepository;

    @GetMapping("")
    public ResponseEntity<List<Bill>> list() {
        try {
            List<Bill> bills = new ArrayList<>(billRepository.findAll());
            if (bills.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(bills, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> listPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        try {
            List<Bill> bills;
            Pageable paging = PageRequest.of(page, size);

            Page<Bill> pageBills;
            pageBills = billRepository.findAll(paging);

            bills = pageBills.getContent();

            Map<String, Object> response = new HashMap<>();
            response.put("items", bills);
            response.put("currentPage", pageBills.getNumber());
            response.put("totalItems", pageBills.getTotalElements());
            response.put("totalPages", pageBills.getTotalPages());

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Bill> get(@PathVariable("id") String id) {
        try {
            Bill bill = billRepository.findById(id).orElse(null);
            return new ResponseEntity<>(bill, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("")
    public ResponseEntity<Bill> add(@RequestBody Bill bill) {
        try {
            billRepository.save(bill);
            return new ResponseEntity<>(bill,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Bill> update(@PathVariable("id") String id, @RequestBody Bill bill) {
        try {
            bill.setId(id);
            billRepository.save(bill);
            return new ResponseEntity<>(bill,HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            billRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
