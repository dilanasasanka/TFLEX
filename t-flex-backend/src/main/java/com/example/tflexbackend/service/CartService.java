package com.example.tflexbackend.service;

import java.util.List;

import com.example.tflexbackend.dto.CartRequest;
import com.example.tflexbackend.entity.CartItem;

public interface CartService {
	List<CartItem> getCartItems(Long userId);

	void addToCart(CartRequest cartRequest);

	void updateCartItemQuantity(Long userId, Long productId, int quantity);

	void removeCartItem(Long userId, Long productId);
}
