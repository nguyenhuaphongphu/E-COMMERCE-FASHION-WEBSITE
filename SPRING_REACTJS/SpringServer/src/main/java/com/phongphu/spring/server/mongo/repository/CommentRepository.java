package com.phongphu.spring.server.mongo.repository;
import com.phongphu.spring.server.mongo.models.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<Comment,String> {
    Page<Comment> findAll(Pageable pageable);
}
