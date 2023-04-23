package com.phongphu.spring.server.mongo;

import com.phongphu.spring.server.mongo.models.ERole;
import com.phongphu.spring.server.mongo.models.Role;
import com.phongphu.spring.server.mongo.repository.RoleRepository;
import com.phongphu.spring.server.mongo.service.FilesStorageService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringServer implements CommandLineRunner {
    @Resource
    @Autowired
    FilesStorageService storageService;

    public static void main(String[] args) {
        SpringApplication.run(SpringServer.class, args);
    }

    @Override
    public void run(String... args) {
        storageService.init();
    }
}