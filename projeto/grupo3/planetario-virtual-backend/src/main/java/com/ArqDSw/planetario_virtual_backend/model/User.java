package com.ArqDSw.planetario_virtual_backend.model;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


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
	
	public User() {
	}
	
	private User(UserBuilder builder) {
		this.id = builder.id;
		this.name = builder.name;
		this.email = builder.email;
		this.password = builder.password;
		this.about = builder.about;
		this.photoURL = builder.photoURL;
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

	
	public static class UserBuilder {
		private Long id;
		private String name;
		private String email;
		private String password;
		private String about;
		private String photoURL;

		public UserBuilder id(Long id) {
			this.id = id;
			return this;
		}

		public UserBuilder name(String name) {
			this.name = name;
			return this;
		}

		public UserBuilder email(String email) {
			this.email = email;
			return this;
		}

		public UserBuilder password(String password) {
			this.password = password;
			return this;
		}
		
		public UserBuilder about(String about) {
			this.about = about;
			return this;
		}
		
		public UserBuilder photoURL(String photoURL) {
			this.photoURL = photoURL;
			return this;
		}

		public User build() {
			return new User(this);
		}
	}
}