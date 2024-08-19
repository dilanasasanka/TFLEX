package com.example.tflexbackend.service;

import com.example.tflexbackend.dto.RegistrationRequest;
import com.example.tflexbackend.entity.User;

public interface UserService {
	User registerUser(RegistrationRequest registrationRequest);

	boolean usernameExists(String username);

	User findByUsername(String username);

	boolean loginIsSuccessful(String username, String password);
}