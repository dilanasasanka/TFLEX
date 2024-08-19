package com.example.tflexbackend.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tflexbackend.entity.Product;
import com.example.tflexbackend.repository.ProductRepository;
import com.example.tflexbackend.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {
	private final ProductRepository productRepository;

	@Autowired
	public ProductServiceImpl(ProductRepository productRepository) {
		this.productRepository = productRepository;
	}

	@Override
	public List<Product> getProductsByCategory(String category) {
		return productRepository.findByCategory(category);
	}

	@Override
	public Product getProductById(Long productId) {
		Optional<Product> product = productRepository.findById(productId);
		return product.orElse(null);
	}
}
