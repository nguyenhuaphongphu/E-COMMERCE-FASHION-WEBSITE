package com.phongphu.spring.server.mongo.service;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;
@Service
public interface FilesStorageService {
    void init();
    void save(MultipartFile file);

    Resource load(String filename);

    boolean delete(String filename);

    Stream<Path> loadAll();

    void saveOthers(MultipartFile file);

    Resource loadOthers(String filename);

    boolean deleteOthers(String filename);

    Stream<Path> loadAllOthers();
    void savePants(MultipartFile file);

    Resource loadPants(String filename);

    boolean deletePants(String filename);

    Stream<Path> loadAllPants();
    void saveShirts(MultipartFile file);

    Resource loadShirts(String filename);

    boolean deleteShirts(String filename);

    Stream<Path> loadAllShirts();
    void saveSnippets(MultipartFile file);

    Resource loadSnippets(String filename);

    boolean deleteSnippets(String filename);

    Stream<Path> loadAllSnippets();
    void saveSuits(MultipartFile file);

    Resource loadSuits(String filename);

    boolean deleteSuits(String filename);

    Stream<Path> loadAllSuits();
}