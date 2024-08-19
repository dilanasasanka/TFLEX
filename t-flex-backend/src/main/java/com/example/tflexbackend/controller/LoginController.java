package com.example.tflexbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tflexbackend.dto.LoginRequest;
import com.example.tflexbackend.entity.User;
import com.example.tflexbackend.service.UserService;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

	@Autowired
	private UserService userService;

	@SuppressWarnings("deprecation")
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
		String username = loginRequest.getUsername();
		String password = loginRequest.getPassword();

		User user = userService.findByUsername(username);

		if (StringUtils.isEmpty(username) || StringUtils.isEmpty(password)) {
			return ResponseEntity.badRequest().body(Collections.singletonMap("error", "Invalid username or password"));
		}

		if (userService.loginIsSuccessful(username, password)) {
			Map<String, String> response = new HashMap<>();
			response.put("message", "Login successful");
			response.put("user id", user.getIdAsString());
			return ResponseEntity.ok(response);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body(Collections.singletonMap("error", "Login failed"));
		}
	}

	@GetMapping("/user")
	public ResponseEntity<User> getLoggedInUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null) {
			User user = (User) authentication.getPrincipal();
			return ResponseEntity.ok(user);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
}
