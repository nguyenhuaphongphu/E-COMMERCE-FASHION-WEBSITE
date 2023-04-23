package com.phongphu.spring.server.mongo.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "importOrders")
public class ImportOrder {
    @Id
    private String id;
    private Date time = new Date(System.currentTimeMillis());
    private Supplier supplier;
    private int totalPrice;
    private List<Product> product;

    public ImportOrder() {
    }

    public ImportOrder(String id, Date time, Supplier supplier, int totalPrice, List<Product> product) {
        this.id = id;
        this.time = time;
        this.supplier = supplier;
        this.totalPrice = totalPrice;
        this.product = product;
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

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<Product> getProduct() {
        return product;
    }

    public void setProduct(List<Product> product) {
        this.product = product;
    }
}
