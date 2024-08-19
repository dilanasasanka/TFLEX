package com.example.tflexbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.tflexbackend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
	User findByUsername(String username);
}
