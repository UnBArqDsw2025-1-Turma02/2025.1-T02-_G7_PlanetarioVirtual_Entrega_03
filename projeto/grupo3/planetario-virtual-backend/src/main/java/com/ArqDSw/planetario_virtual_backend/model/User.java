package com.ArqDSw.planetario_virtual_backend.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import com.ArqDSw.planetario_virtual_backend.ENUM.UserType;
import com.ArqDSw.planetario_virtual_backend.builder.UserBuilder;

@Entity
@Table(name="tb_users")
public class User {

    @Id
    @GeneratedValue
    private Long id;

    @Nonnull
    private String name;

    @Nonnull
    private String email;

    @Nonnull
    private String password;

    private String about;

    private String photoURL;

    @Nonnull
    @Enumerated(EnumType.STRING)
    private UserType userType;

    public User() {
        
    }

    public User(UserBuilder<?> builder) {
        this.id = builder.getId(); 
        this.name = builder.getName(); 
        this.email = builder.getEmail(); 
        this.password = builder.getPassword(); 
        this.about = builder.getAbout(); 
        this.photoURL = builder.getPhotoURL();
        this.userType = builder.getUserType(); 

        if (this.email == null || this.email.isBlank()) {
            throw new IllegalArgumentException("Email é obrigatório.");
        }
        if (this.password == null || this.password.isBlank()) {
            throw new IllegalArgumentException("Senha é obrigatória.");
        }
        if (this.name == null || this.name.isBlank()) {
            throw new IllegalArgumentException("Nome é obrigatório.");
        }
        if (this.userType == null) {
            throw new IllegalArgumentException("Tipo de usuário é obrigatório.");
        }
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

	public void setId(final Long id) {
		this.id = id;
	}

	public void setName(final String name) {
		this.name = name;
	}

	public void setEmail(final String email) {
		this.email = email;
	}

	public void setPassword(final String password) {
		this.password = password;
	}
	
	public void setAbout(final String about) {
		this.about = about;
	}

	public void setPhotoURL(final String photoURL) {
		this.photoURL = photoURL;
	}

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    @Override
    public String toString() {
        return "User{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", email='" + email + '\'' +
               ", password='[PROTECTED]'" +
               ", about='" + (about != null ? about : "N/A") + '\'' +
               ", photoURL='" + (photoURL != null ? photoURL : "N/A") + '\'' +
               ", userType=" + userType +
               '}';
    }

}