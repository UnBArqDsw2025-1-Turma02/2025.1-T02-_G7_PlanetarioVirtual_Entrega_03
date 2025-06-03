package com.ArqDSw.planetario_virtual_backend.builder;

import com.ArqDSw.planetario_virtual_backend.model.User;
import com.ArqDSw.planetario_virtual_backend.ENUM.UserType;

public class RegisteredUserBuilder extends UserBuilder<RegisteredUserBuilder> {

    public RegisteredUserBuilder(String name, String email, String password) {
        super(name, email, password, UserType.REGISTERED);
    }

    @Override
    public User build() {

        return new User(this);
    }

    @Override
    protected RegisteredUserBuilder self() {
        return this;
    }
}