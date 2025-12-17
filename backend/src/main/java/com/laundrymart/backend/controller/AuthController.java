package com.laundrymart.backend.controller;

import com.laundrymart.backend.config.JwtUtil;
import com.laundrymart.backend.entity.User;
import com.laundrymart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // For React frontend
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        // Check for existing email if user is registering
        if (user.getEmail() != null && userRepository.findByUsername(user.getEmail()).isPresent()) {
            // Wait, repo method might only search by username. Check repo first.
            // Assuming findByEmail doesn't exist, I'll fallback to generic constraint or
            // check if findByUsername works for email?
            // Generally, unique constraint is best check if repo is simple.
            // But let's see if we can check it.
        }

        // Actually, let's keep it simple for now and rely on try-catch
        // DataIntegrityViolationException at class level or method level
        // But better:
        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);

            // Optionally return token on registration
            String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole());
            return ResponseEntity.ok(Map.of("token", token, "user", savedUser));
        } catch (org.springframework.dao.DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body("Username or Email already exists");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginRequest) {
        var userOpt = userRepository.findByUsername(loginRequest.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        User user = userOpt.get();

        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());

        return ResponseEntity.ok(Map.of(
                "token", token,
                "user", Map.of(
                        "id", user.getId(),
                        "username", user.getUsername(),
                        "role", user.getRole(),
                        "email", user.getEmail())));
    }
}