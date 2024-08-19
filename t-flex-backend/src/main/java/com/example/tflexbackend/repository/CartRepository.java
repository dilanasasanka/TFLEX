package com.example.tflexbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.tflexbackend.entity.CartItem;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
	CartItem findByUserIdAndProductId(Long userId, Long productId);

	List<CartItem> findByUserId(Long userId);

	void deleteByUserIdAndProductId(Long userId, Long productId);
}