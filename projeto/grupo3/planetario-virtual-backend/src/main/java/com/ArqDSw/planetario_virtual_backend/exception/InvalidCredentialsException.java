package com.ArqDSw.planetario_virtual_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class InvalidCredentialsException extends ResponseStatusException {

    public InvalidCredentialsException(String message) {
        super(HttpStatus.UNAUTHORIZED, message); // 401 Unauthorized
    }
}