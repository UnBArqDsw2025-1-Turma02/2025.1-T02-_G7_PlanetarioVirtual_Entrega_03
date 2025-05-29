package com.ArqDSw.planetario_virtual_backend.exception;

import org.springframework.http.HttpStatus;

public class DuplicateEmailException extends CustomException {
    public DuplicateEmailException(String email) {
        super("Email alredy in use: " + email, HttpStatus.BAD_REQUEST);
    }
}