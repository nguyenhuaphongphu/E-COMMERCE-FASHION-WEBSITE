package com.phongphu.spring.server.mongo.service;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.stream.Stream;

@Service
public class FilesStorageServiceImpl implements FilesStorageService {

    private final Path root = Paths.get("uploads");
    private final Path rootShirts = Paths.get("uploads/shirts");
    private final Path rootPants = Paths.get("uploads/pants");
    private final Path rootSuits = Paths.get("uploads/suits");
    private final Path rootSnippets = Paths.get("uploads/snippets");
    private final Path rootOthers = Paths.get("uploads/others");

    @Override
    public void init() {
        try {
            Files.createDirectories(root);
            Files.createDirectories(rootShirts);
            Files.createDirectories(rootPants);
            Files.createDirectories(rootSuits);
            Files.createDirectories(rootOthers);
            Files.createDirectories(rootSnippets);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    @Override
    public void save(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.root.resolve(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean delete(String filename) {
        try {
            Path file = root.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.root, 1).filter(path -> !path.equals(this.root)).map(this.root::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    @Override
    public void saveOthers(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootOthers.resolve(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource loadOthers(String filename) {
        try {
            Path file = rootOthers.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean deleteOthers(String filename) {
        try {
            Path file = rootOthers.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAllOthers() {
        try {
            return Files.walk(this.rootOthers, 1).filter(path -> !path.equals(this.rootOthers)).map(this.rootOthers::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    @Override
    public void savePants(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootPants.resolve(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource loadPants(String filename) {
        try {
            Path file = rootPants.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean deletePants(String filename) {
        try {
            Path file = rootPants.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAllPants() {
        try {
            return Files.walk(this.rootPants, 1).filter(path -> !path.equals(this.rootPants)).map(this.rootPants::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    @Override
    public void saveShirts(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootShirts.resolve(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource loadShirts(String filename) {
        try {
            Path file = rootShirts.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean deleteShirts(String filename) {
        try {
            Path file = rootShirts.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAllShirts() {
        try {
            return Files.walk(this.rootShirts, 1).filter(path -> !path.equals(this.rootShirts)).map(this.rootShirts::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    @Override
    public void saveSnippets(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootSnippets.resolve(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource loadSnippets(String filename) {
        try {
            Path file = rootSnippets.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean deleteSnippets(String filename) {
        try {
            Path file = rootSnippets.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAllSnippets() {
        try {
            return Files.walk(this.rootSnippets, 1).filter(path -> !path.equals(this.rootSnippets)).map(this.rootSnippets::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }

    @Override
    public void saveSuits(MultipartFile file) {
        try {
            Files.copy(file.getInputStream(), this.rootSuits.resolve(Objects.requireNonNull(file.getOriginalFilename())));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }
            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource loadSuits(String filename) {
        try {
            Path file = rootSuits.resolve(filename);
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean deleteSuits(String filename) {
        try {
            Path file = rootSuits.resolve(filename);
            return Files.deleteIfExists(file);
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Stream<Path> loadAllSuits() {
        try {
            return Files.walk(this.rootSuits, 1).filter(path -> !path.equals(this.rootSuits)).map(this.rootSuits::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}
