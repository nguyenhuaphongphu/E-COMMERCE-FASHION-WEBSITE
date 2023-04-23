package com.phongphu.spring.server.mongo.repository;

import com.phongphu.spring.server.mongo.models.ImportOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ImportOrderRepository extends MongoRepository<ImportOrder,String> {
    Page<ImportOrder> findAll(Pageable pageable);
}
