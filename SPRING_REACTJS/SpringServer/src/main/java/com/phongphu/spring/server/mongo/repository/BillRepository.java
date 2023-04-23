package com.phongphu.spring.server.mongo.repository;

import com.phongphu.spring.server.mongo.models.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BillRepository extends MongoRepository<Bill,String> {
    Page<Bill> findAll(Pageable pageable);
}
