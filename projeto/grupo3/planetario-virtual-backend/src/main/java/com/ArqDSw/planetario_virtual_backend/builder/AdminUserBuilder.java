package com.ArqDSw.planetario_virtual_backend.builder;

import com.ArqDSw.planetario_virtual_backend.model.User;
import com.ArqDSw.planetario_virtual_backend.ENUM.UserType;

public class AdminUserBuilder extends UserBuilder<AdminUserBuilder> {

    public AdminUserBuilder(String name, String email, String password) {
        super(name, email, password, UserType.ADMIN);
    }

    @Override
    public User build() {
        return new User(this);
    }

    @Override
    protected AdminUserBuilder self() {
        return this;
    }
}