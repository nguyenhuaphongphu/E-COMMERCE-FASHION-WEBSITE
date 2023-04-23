package com.phongphu.spring.server.mongo.models;

import java.util.HashSet;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
  @Id
  private String id;

  private String username;

  @Email
  private String email;

  private String phone;
  private String fullname;
  private String address;
  private String password;

  @DBRef
  private Set<Role> roles = new HashSet<>();

  public User() {
  }

  public User(String username, String email, String phone, String fullname, String address, String password) {
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.fullname = fullname;
    this.address = address;
    this.password = password;
  }

  public User(String id, String username, String email, String phone, String fullname, String address, String password, Set<Role> roles) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.fullname = fullname;
    this.address = address;
    this.password = password;
    this.roles = roles;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }

  public String getFullname() {
    return fullname;
  }

  public void setFullname(String fullname) {
    this.fullname = fullname;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
}