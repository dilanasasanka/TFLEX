package com.example.tflexbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.tflexbackend.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	Role findByName(String name);
}
