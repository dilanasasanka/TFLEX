package com.example.tflexbackend.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.tflexbackend.dto.CartRequest;
import com.example.tflexbackend.entity.CartItem;
import com.example.tflexbackend.repository.CartRepository;
import com.example.tflexbackend.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	private final CartRepository cartRepository;

	@Autowired
	public CartServiceImpl(CartRepository cartRepository) {
		this.cartRepository = cartRepository;
	}

	@Override
	public List<CartItem> getCartItems(Long userId) {
		return cartRepository.findByUserId(userId);
	}

	@Override
	public void addToCart(CartRequest cartRequest) {
		CartItem existingCartItem = cartRepository.findByUserIdAndProductId(cartRequest.getUserId(),
				cartRequest.getProductId());

		CartItem newCartItem = new CartItem();
		newCartItem.setUserId(cartRequest.getUserId());
		newCartItem.setProductId(cartRequest.getProductId());
		newCartItem.setQuantity(cartRequest.getQuantity());

		if (existingCartItem != null) {
			existingCartItem.setQuantity(existingCartItem.getQuantity() + cartRequest.getQuantity());
			cartRepository.save(existingCartItem);
		} else {
			cartRepository.save(newCartItem);
		}
	}

	@Override
	public void updateCartItemQuantity(Long userId, Long productId, int quantity) {
		CartItem cartItem = cartRepository.findByUserIdAndProductId(userId, productId);

		if (cartItem != null) {
			cartItem.setQuantity(quantity);
			cartRepository.save(cartItem);
		}
	}

	@Override
	public void removeCartItem(Long userId, Long productId) {
		cartRepository.deleteByUserIdAndProductId(userId, productId);
	}

}
