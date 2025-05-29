package com.ArqDSw.planetario_virtual_backend.dto;

public class UserResponseDTO {
    private Long id;
    private String name;
    private String email;
	private String about;
	private String photoURL;

    public UserResponseDTO(Long id, String name, String email,String about, String photoURL) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.about = about;
        this.photoURL = photoURL;
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

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getPhotoURL() {
		return photoURL;
	}

	public void setPhotoURL(String photoURL) {
		this.photoURL = photoURL;
	}
    
}