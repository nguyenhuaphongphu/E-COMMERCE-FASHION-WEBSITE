package com.phongphu.spring.server.mongo.repository;

import com.phongphu.spring.server.mongo.models.FileInfo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ImageRepository extends MongoRepository<FileInfo,String> {
    Page<FileInfo> findAll (Pageable pageable);
}
