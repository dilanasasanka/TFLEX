package com.example.tflexbackend.controller;

import com.example.tflexbackend.dto.RegistrationRequest;
import com.example.tflexbackend.entity.User;
import com.example.tflexbackend.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "http://localhost:4200")
public class RegistrationController {
	private final UserService userService;

	public RegistrationController(UserService userService) {
		this.userService = userService;
	}

	@PostMapping
	public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
		if (userService.usernameExists(registrationRequest.getUsername())) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
		}

		User registeredUser = userService.registerUser(registrationRequest);
		if (registeredUser == null) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
		}

		return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful");
	}
}
