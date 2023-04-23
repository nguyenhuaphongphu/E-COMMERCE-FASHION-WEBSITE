package com.phongphu.spring.server.mongo.controllers;

import com.phongphu.spring.server.mongo.models.*;
import com.phongphu.spring.server.mongo.payload.request.LoginRequest;
import com.phongphu.spring.server.mongo.payload.request.SignupRequest;
import com.phongphu.spring.server.mongo.payload.response.JwtResponse;
import com.phongphu.spring.server.mongo.payload.response.MessageResponse;
import com.phongphu.spring.server.mongo.repository.RoleRepository;
import com.phongphu.spring.server.mongo.repository.UserRepository;
import com.phongphu.spring.server.mongo.security.jwt.JwtUtils;
import com.phongphu.spring.server.mongo.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping("")
    public ResponseEntity<List<User>> list() {
        try {
            List<User> users = new ArrayList<>(userRepository.findAll());
            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(users, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }


    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable("id") String id) {
        try {
            User user = userRepository.findById(id).orElse(null);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (NoSuchElementException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable("id") String id, @RequestBody SignupRequest user) {
        User usernew = userRepository.findById(id).get();
        if (user.getUsername() != null) {
            usernew.setUsername(user.getUsername());
        }
        if (user.getPassword() != null) {
            usernew.setPassword(user.getPassword());
        }
        if (user.getFullname() != null) {
            usernew.setFullname(user.getFullname());
        }
        if (user.getAddress() != null) {
            usernew.setAddress(user.getAddress());
        }
        if (user.getEmail() != null) {
            usernew.setEmail(user.getEmail());
        }
        if (user.getPhone() != null) {
            usernew.setPhone(user.getPhone());
        }
        Set<String> strRoles = user.getRoles();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "updater":
                        Role updateRole = roleRepository.findByName(ERole.ROLE_UPDATER)
                                .orElseThrow(() -> new RuntimeException("Error: Updater is not found."));
                        roles.add(updateRole);
                        break;
                    case "seller":
                        Role sellRole = roleRepository.findByName(ERole.ROLE_SELLER)
                                .orElseThrow(() -> new RuntimeException("Error: Seller is not found."));
                        roles.add(sellRole);
                        break;
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Admin is not found."));
                        roles.add(adminRole);
                        break;
                    case "manager":
                        Role managerRole = roleRepository.findByName(ERole.ROLE_MANAGER)
                                .orElseThrow(() -> new RuntimeException("Error: Manager is not found."));
                        roles.add(managerRole);
                        break;
                    case "chairman":
                        Role chairmanRole = roleRepository.findByName(ERole.ROLE_CHAIRMAN)
                                .orElseThrow(() -> new RuntimeException("Error: Chairman is not found."));
                        roles.add(chairmanRole);
                        break;
                    case "createproduct":
                        Role createproductRole = roleRepository.findByName(ERole.ROLE_CREATEPRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATEPRODUCT is not found."));
                        roles.add(createproductRole);
                        break;
                    case "updateproduct":
                        Role updateproductRole = roleRepository.findByName(ERole.ROLE_UPDATEPRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATEPRODUCT is not found."));
                        roles.add(updateproductRole);
                        break;
                    case "readproduct":
                        Role readproductRole = roleRepository.findByName(ERole.ROLE_READPRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READPRODUCT is not found."));
                        roles.add(readproductRole);
                        break;
                    case "deleteproduct":
                        Role deleteproductRole = roleRepository.findByName(ERole.ROLE_DELETEPRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETEPRODUCT is not found."));
                        roles.add(deleteproductRole);
                        break;
                    case "createtypeofproduct":
                        Role createtypeofproductRole = roleRepository.findByName(ERole.ROLE_CREATETYPEOFPRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATETYPEOFPRODUCT is not found."));
                        roles.add(createtypeofproductRole);
                        break;
                    case "updatetypeofproduct":
                        Role updatetypeofproductRole = roleRepository.findByName(ERole.ROLE_UPDATETYPEOFPRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATETYPEOFPRODUCT is not found."));
                        roles.add(updatetypeofproductRole);
                        break;
                    case "readtypeofproduct":
                        Role readtypeofproductRole = roleRepository.findByName(ERole.ROLE_READTYPEOFPRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READTYPEOFPRODUCT is not found."));
                        roles.add(readtypeofproductRole);
                        break;
                    case "deletetypeofproduct":
                        Role deletetypeofproductRole = roleRepository.findByName(ERole.ROLE_DELETEPTYPEOFRODUCT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETEPTYPEOFRODUCT is not found."));
                        roles.add(deletetypeofproductRole);
                        break;
                    case "createsupplier":
                        Role createsupplierRole = roleRepository.findByName(ERole.ROLE_CREATESUPPLIER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATESUPPLIER is not found."));
                        roles.add(createsupplierRole);
                        break;
                    case "updatesupplier":
                        Role updatesupplierRole = roleRepository.findByName(ERole.ROLE_UPDATESUPPLIER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATESUPPLIER is not found."));
                        roles.add(updatesupplierRole);
                        break;
                    case "readsupplier":
                        Role readsupplierRole = roleRepository.findByName(ERole.ROLE_READSUPPLIER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READSUPPLIER is not found."));
                        roles.add(readsupplierRole);
                        break;
                    case "deletesupplier":
                        Role deletesupplierRole = roleRepository.findByName(ERole.ROLE_DELETESUPPLIER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETESUPPLIER is not found."));
                        roles.add(deletesupplierRole);
                        break;
                    case "createtag":
                        Role createtagRole = roleRepository.findByName(ERole.ROLE_CREATETAG)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATETAG is not found."));
                        roles.add(createtagRole);
                        break;
                    case "updatetag":
                        Role updatetagRole = roleRepository.findByName(ERole.ROLE_UPDATETAG)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATETAG is not found."));
                        roles.add(updatetagRole);
                        break;
                    case "readtag":
                        Role readtagRole = roleRepository.findByName(ERole.ROLE_READTAG)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READTAG is not found."));
                        roles.add(readtagRole);
                        break;
                    case "deletetag":
                        Role deletetagRole = roleRepository.findByName(ERole.ROLE_DELETETAG)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETETAG is not found."));
                        roles.add(deletetagRole);
                        break;
                    case "createimportorder":
                        Role createimportorderRole = roleRepository.findByName(ERole.ROLE_CREATEIMPORTORDER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATEIMPORTORDER is not found."));
                        roles.add(createimportorderRole);
                        break;
                    case "updateimportorder":
                        Role updateimportorderRole = roleRepository.findByName(ERole.ROLE_UPDATEIMPORTORDER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATEIMPORTORDER is not found."));
                        roles.add(updateimportorderRole);
                        break;
                    case "readimportorder":
                        Role readimportorderRole = roleRepository.findByName(ERole.ROLE_READIMPORTORDER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READIMPORTORDER is not found."));
                        roles.add(readimportorderRole);
                        break;
                    case "deleteimportorder":
                        Role deleteimportorderRole = roleRepository.findByName(ERole.ROLE_DELETEIMPORTORDER)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETEIMPORTORDER is not found."));
                        roles.add(deleteimportorderRole);
                        break;
                    case "createimage":
                        Role createimageRole = roleRepository.findByName(ERole.ROLE_CREATEIMAGE)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATEIMAGE is not found."));
                        roles.add(createimageRole);
                        break;
                    case "readimage":
                        Role readimageRole = roleRepository.findByName(ERole.ROLE_READIMAGE)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READIMAGE is not found."));
                        roles.add(readimageRole);
                        break;
                    case "deleteimage":
                        Role deleteimageRole = roleRepository.findByName(ERole.ROLE_DELETEIMAGE)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETEIMAGE is not found."));
                        roles.add(deleteimageRole);
                        break;
                    case "createcomment":
                        Role createcommentRole = roleRepository.findByName(ERole.ROLE_CREATECOMMENT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATECOMMENT is not found."));
                        roles.add(createcommentRole);
                        break;
                    case "updatecomment":
                        Role updatecommentRole = roleRepository.findByName(ERole.ROLE_UPDATECOMMENT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATECOMMENT is not found."));
                        roles.add(updatecommentRole);
                        break;
                    case "readcomment":
                        Role readcommentRole = roleRepository.findByName(ERole.ROLE_READCOMMENT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READCOMMENT is not found."));
                        roles.add(readcommentRole);
                        break;
                    case "deletecomment":
                        Role deletecommentRole = roleRepository.findByName(ERole.ROLE_DELETECOMMENT)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETECOMMENT is not found."));
                        roles.add(deletecommentRole);
                        break;
                    case "createbrand":
                        Role createbrandRole = roleRepository.findByName(ERole.ROLE_CREATEBRAND)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATEBRAND is not found."));
                        roles.add(createbrandRole);
                        break;
                    case "updatebrand":
                        Role updatebrandRole = roleRepository.findByName(ERole.ROLE_UPDATEBRAND)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATEBRAND is not found."));
                        roles.add(updatebrandRole);
                        break;
                    case "readbrand":
                        Role readbrandRole = roleRepository.findByName(ERole.ROLE_READBRAND)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READBRAND is not found."));
                        roles.add(readbrandRole);
                        break;
                    case "deletebrand":
                        Role deletebrandRole = roleRepository.findByName(ERole.ROLE_DELETEBRAND)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETEBRAND is not found."));
                        roles.add(deletebrandRole);
                        break;
                    case "createbill":
                        Role createbillRole = roleRepository.findByName(ERole.ROLE_CREATEBILL)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_CREATEBILL is not found."));
                        roles.add(createbillRole);
                        break;
                    case "updatebill":
                        Role updatebillRole = roleRepository.findByName(ERole.ROLE_UPDATEBILL)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_UPDATEBILL is not found."));
                        roles.add(updatebillRole);
                        break;
                    case "readbill":
                        Role readbillRole = roleRepository.findByName(ERole.ROLE_READBILL)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_READBILL is not found."));
                        roles.add(readbillRole);
                        break;
                    case "deletebill":
                        Role deletebillRole = roleRepository.findByName(ERole.ROLE_DELETEBILL)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_DELETEBILL is not found."));
                        roles.add(deletebillRole);
                        break;
                    case "grantaccess":
                        Role grantaccessRole = roleRepository.findByName(ERole.ROLE_GRANTACCESS)
                                .orElseThrow(() -> new RuntimeException("Error: ROLE_GRANTACCESS is not found."));
                        roles.add(grantaccessRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: UserDefault is not found."));
                        roles.add(userRole);
                }
            });
        }
        usernew.setRoles(roles);
        userRepository.save(usernew);
        return new ResponseEntity<>(usernew, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPhone(),
                signUpRequest.getFullname(),
                signUpRequest.getAddress(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();
        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        }
        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") String id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}