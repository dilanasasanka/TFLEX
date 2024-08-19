package com.example.tflexbackend.controller;

import java.util.Map;

import javax.transaction.Transactional;

import java.util.HashMap;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tflexbackend.dto.CartRequest;
import com.example.tflexbackend.entity.CartItem;
import com.example.tflexbackend.service.CartService;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

	private final CartService cartService;

	public CartController(CartService cartService) {
		this.cartService = cartService;
	}

	@PostMapping("/add")
	public ResponseEntity<Map<String, String>> addToCart(@RequestBody CartRequest cartRequest) {
		cartService.addToCart(cartRequest);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Product added to cart successfully.");

		return ResponseEntity.ok(response);
	}

	@GetMapping("/{userId}")
	public ResponseEntity<List<CartItem>> getCartItems(@PathVariable Long userId) {
		List<CartItem> cartItems = cartService.getCartItems(userId);
		return ResponseEntity.ok(cartItems);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateCartItemQuantity(@RequestBody CartRequest cartRequest) {
		cartService.updateCartItemQuantity(cartRequest.getUserId(), cartRequest.getProductId(),
				cartRequest.getQuantity());
		return ResponseEntity.ok("Cart item quantity updated successfully.");
	}

	@Transactional
	@DeleteMapping("/remove/{userId}/{productId}")
	public ResponseEntity<?> removeCartItem(@PathVariable Long userId, @PathVariable Long productId) {
		System.out.println("Removing item from cart: userId=" + userId + ", productId=" + productId);
		cartService.removeCartItem(userId, productId);
		return ResponseEntity.ok().body("{\"message\": \"Product removed from cart successfully.\"}");
	}

}