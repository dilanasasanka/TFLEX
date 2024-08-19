package com.example.tflexbackend.service.impl;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.tflexbackend.dto.RegistrationRequest;
import com.example.tflexbackend.entity.Role;
import com.example.tflexbackend.entity.User;
import com.example.tflexbackend.repository.RoleRepository;
import com.example.tflexbackend.repository.UserRepository;
import com.example.tflexbackend.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	private final UserRepository userRepository;
	private final RoleRepository roleRepository;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@Override
	public User registerUser(RegistrationRequest registrationRequest) {
		User user = new User();
		user.setUsername(registrationRequest.getUsername());
		user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

		Role userRole = roleRepository.findByName("ROLE_USER");
		user.setRoles(Collections.singleton(userRole));

		return userRepository.save(user);
	}

	@Override
	public boolean usernameExists(String username) {
		return userRepository.findByUsername(username) != null;
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public boolean loginIsSuccessful(String username, String password) {
		User user = userRepository.findByUsername(username);

		if (user != null) {
			if (passwordEncoder.matches(password, user.getPassword())) {
				return true;
			}
		}
		return false;
	}

}
