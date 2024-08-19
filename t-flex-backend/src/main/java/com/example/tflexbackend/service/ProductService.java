package com.example.tflexbackend.service;

import java.util.List;

import com.example.tflexbackend.entity.Product;

public interface ProductService {
	List<Product> getProductsByCategory(String category);

	Product getProductById(Long productId);
}
