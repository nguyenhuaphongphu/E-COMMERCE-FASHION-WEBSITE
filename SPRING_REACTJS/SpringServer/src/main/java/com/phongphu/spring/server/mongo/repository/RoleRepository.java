package com.phongphu.spring.server.mongo.repository;

import java.util.Optional;

import com.phongphu.spring.server.mongo.models.ERole;
import com.phongphu.spring.server.mongo.models.Role;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RoleRepository extends MongoRepository<Role, String> {
  Optional<Role> findByName(ERole name);
}
