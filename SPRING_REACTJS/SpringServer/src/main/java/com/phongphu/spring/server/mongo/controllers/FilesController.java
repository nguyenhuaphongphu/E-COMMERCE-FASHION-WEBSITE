package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.FileInfo;
import com.phongphu.spring.server.mongo.payload.response.MessageResponse;
import com.phongphu.spring.server.mongo.service.FilesStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin
@RequestMapping("/files")
public class FilesController {

    @Autowired
    FilesStorageService storageService;

    @PostMapping("/upload")
    public ResponseEntity<MessageResponse> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        String message;
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.stream(files).forEach(file -> {
                storageService.save(file);
                fileNames.add(file.getOriginalFilename());
            });

            message = "Uploaded the files successfully: " + fileNames;
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("")
    public ResponseEntity<List<FileInfo>> getListFiles() {
        List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile", path.getFileName().toString()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        Resource file = storageService.load(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @DeleteMapping("/{filename:.+}")
    public ResponseEntity<MessageResponse> deleteFile(@PathVariable String filename) {
        String message;

        try {
            boolean existed = storageService.delete(filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(message));
        }
    }
    @PostMapping("/uploadPants")
    public ResponseEntity<MessageResponse> uploadPants(@RequestParam("files") MultipartFile[] files) {
        String message;
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.stream(files).forEach(file -> {
                storageService.savePants(file);
                fileNames.add(file.getOriginalFilename());
            });

            message = "Uploaded the files successfully: " + fileNames;
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/Pants")
    public ResponseEntity<List<FileInfo>> getListPants() {
        List<FileInfo> fileInfos = storageService.loadAllPants().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile","Pant/" + path.getFileName()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/Pant/{filename:.+}")
    public ResponseEntity<Resource> getFilePants(@PathVariable String filename) {
        Resource file = storageService.loadPants(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @DeleteMapping("/Pants/{filename:.+}")
    public ResponseEntity<MessageResponse> deletePants(@PathVariable String filename) {
        String message;

        try {
            boolean existed = storageService.deletePants(filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(message));
        }
    }

    @PostMapping("/uploadOthers")
    public ResponseEntity<MessageResponse> uploadOthers(@RequestParam("files") MultipartFile[] files) {
        String message;
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.stream(files).forEach(file -> {
                storageService.saveOthers(file);
                fileNames.add(file.getOriginalFilename());
            });

            message = "Uploaded the files successfully: " + fileNames;
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/Others")
    public ResponseEntity<List<FileInfo>> getListOthers() {
        List<FileInfo> fileInfos = storageService.loadAllOthers().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile", "Other/" + path.getFileName()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/Other/{filename:.+}")
    public ResponseEntity<Resource> getFileOthers(@PathVariable String filename) {
        Resource file = storageService.loadOthers(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @DeleteMapping("/Other/{filename:.+}")
    public ResponseEntity<MessageResponse> deleteOthers(@PathVariable String filename) {
        String message;

        try {
            boolean existed = storageService.deleteOthers(filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(message));
        }
    }

    @PostMapping("/uploadShirts")
    public ResponseEntity<MessageResponse> uploadShirts(@RequestParam("files") MultipartFile[] files) {
        String message;
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.stream(files).forEach(file -> {
                storageService.saveShirts(file);
                fileNames.add(file.getOriginalFilename());
            });

            message = "Uploaded the files successfully: " + fileNames;
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/Shirts")
    public ResponseEntity<List<FileInfo>> getListShirts() {
        List<FileInfo> fileInfos = storageService.loadAllShirts().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile","Shirt/" + path.getFileName()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/Shirt/{filename:.+}")
    public ResponseEntity<Resource> getFileShirts(@PathVariable String filename) {
        Resource file = storageService.loadShirts(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @DeleteMapping("/Shirt/{filename:.+}")
    public ResponseEntity<MessageResponse> deleteShirts(@PathVariable String filename) {
        String message;

        try {
            boolean existed = storageService.deleteShirts(filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(message));
        }
    }

    @PostMapping("/uploadSuits")
    public ResponseEntity<MessageResponse> uploadSuits(@RequestParam("files") MultipartFile[] files) {
        String message;
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.stream(files).forEach(file -> {
                storageService.saveSuits(file);
                fileNames.add(file.getOriginalFilename());
            });

            message = "Uploaded the files successfully: " + fileNames;
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/Suits")
    public ResponseEntity<List<FileInfo>> getListSuits() {
        List<FileInfo> fileInfos = storageService.loadAllSuits().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile", "Suit/" +path.getFileName()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/Suit/{filename:.+}")
    public ResponseEntity<Resource> getFileSuits(@PathVariable String filename) {
        Resource file = storageService.loadSuits(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @DeleteMapping("/Suit/{filename:.+}")
    public ResponseEntity<MessageResponse> deleteSuits(@PathVariable String filename) {
        String message;

        try {
            boolean existed = storageService.deleteSuits(filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(message));
        }
    }

    @PostMapping("/uploadSnippets")
    public ResponseEntity<MessageResponse> uploadSnippets(@RequestParam("files") MultipartFile[] files) {
        String message;
        try {
            List<String> fileNames = new ArrayList<>();

            Arrays.stream(files).forEach(file -> {
                storageService.saveSnippets(file);
                fileNames.add(file.getOriginalFilename());
            });

            message = "Uploaded the files successfully: " + fileNames;
            return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Fail to upload files!";
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new MessageResponse(message));
        }
    }

    @GetMapping("/Snippets")
    public ResponseEntity<List<FileInfo>> getListSnippets() {
        List<FileInfo> fileInfos = storageService.loadAllSnippets().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(FilesController.class, "getFile", "Snippet/" +path.getFileName()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    @GetMapping("/Snippet/{filename:.+}")
    public ResponseEntity<Resource> getFileSnippets(@PathVariable String filename) {
        Resource file = storageService.loadSnippets(filename);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
    @DeleteMapping("/Snippet/{filename:.+}")
    public ResponseEntity<MessageResponse> deleteSnippets(@PathVariable String filename) {
        String message;

        try {
            boolean existed = storageService.deleteSnippets(filename);

            if (existed) {
                message = "Delete the file successfully: " + filename;
                return ResponseEntity.status(HttpStatus.OK).body(new MessageResponse(message));
            }

            message = "The file does not exist!";
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse(message));
        } catch (Exception e) {
            message = "Could not delete the file: " + filename + ". Error: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new MessageResponse(message));
        }
    }
}
