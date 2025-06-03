package com.ArqDSw.planetario_virtual_backend.builder;

import com.ArqDSw.planetario_virtual_backend.model.User;
import com.ArqDSw.planetario_virtual_backend.ENUM.UserType;

public abstract class UserBuilder<T extends UserBuilder<T>> {
    protected Long id;
    protected String name;
    protected String email;
    protected String password;
    protected String about;
    protected String photoURL;
    protected UserType userType;

    public UserBuilder(String name, String email, String password, UserType userType) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    public T id(Long id) {
        this.id = id;
        return self();
    }

    public T about(String about) {
        this.about = about;
        return self();
    }

    public T photoURL(String photoURL) {
        this.photoURL = photoURL;
        return self();
    }
    
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getAbout() {
        return about;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public UserType getUserType() {
        return userType;
    }

    public abstract User build();

    protected abstract T self();
}