package com.phongphu.spring.server.mongo.repository;

import com.phongphu.spring.server.mongo.models.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TagRepository extends MongoRepository<Tag,String> {
    Page<Tag> findAll(Pageable pageable);
}
