package com.phongphu.spring.server.mongo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "bills")
public class Bill {
    @Id
    private String id;
    private Date time = new Date(System.currentTimeMillis());
    private boolean delivered;
    private boolean status;
    private List<Product> product;
    private String customer;
    private int totalPrice;
    private String description;

    public Bill() {
    }

    public Bill(String id, Date time, boolean delivered, boolean status, List<Product> product, String customer, int totalPrice, String description) {
        this.id = id;
        this.time = time;
        this.delivered = delivered;
        this.status = status;
        this.product = product;
        this.customer = customer;
        this.totalPrice = totalPrice;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public boolean isDelivered() {
        return delivered;
    }

    public void setDelivered(boolean delivered) {
        this.delivered = delivered;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Product> getProduct() {
        return product;
    }

    public void setProduct(List<Product> product) {
        this.product = product;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
