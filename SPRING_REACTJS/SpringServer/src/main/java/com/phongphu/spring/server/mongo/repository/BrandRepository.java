package com.phongphu.spring.server.mongo.repository;

import com.phongphu.spring.server.mongo.models.Brand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BrandRepository extends MongoRepository<Brand,String> {
    Page<Brand> findAll(Pageable pageable);
}
