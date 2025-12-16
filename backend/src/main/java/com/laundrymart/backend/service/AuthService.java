package com.laundrymart.backend.service;

// Import necessary JWT libraries (add io.jsonwebtoken to pom.xml)
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(String username, String role) {
        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    // Add validateToken method
}