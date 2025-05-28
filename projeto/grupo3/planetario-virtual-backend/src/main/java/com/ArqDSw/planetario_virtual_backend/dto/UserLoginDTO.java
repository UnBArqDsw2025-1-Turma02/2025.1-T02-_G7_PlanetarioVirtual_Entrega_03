package com.ArqDSw.planetario_virtual_backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class UserLoginDTO {
	
	@NotBlank 
	@Email   
	private String email;
	
	@NotBlank
	private String password;
	
	@Schema(accessMode = Schema.AccessMode.READ_ONLY)
	private String token;
	    
	public UserLoginDTO(){
		
	   }
	  
	public UserLoginDTO(String email, String password){
	        this.email = email;
	        this.password = password;
	   }


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}


}