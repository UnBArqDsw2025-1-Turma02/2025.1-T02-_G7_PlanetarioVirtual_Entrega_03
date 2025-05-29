package com.ArqDSw.planetario_virtual_backend.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ArqDSw.planetario_virtual_backend.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;

@Service
public class JwtTokenService {

    private final SecretKey secretKey;
    private final long validityInMilliseconds = 3600000; // 1 hora

    public JwtTokenService(@Value("${jwt.secret}") String secret) {
      
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("name", user.getName())
                .claim("userId", user.getId())
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }


}
