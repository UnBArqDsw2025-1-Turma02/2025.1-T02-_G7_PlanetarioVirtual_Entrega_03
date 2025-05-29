package com.ArqDSw.planetario_virtual_backend.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends CustomException {
    public UserNotFoundException(String string) {
        super("User not found with ID: " + string, HttpStatus.NOT_FOUND);
    }
}