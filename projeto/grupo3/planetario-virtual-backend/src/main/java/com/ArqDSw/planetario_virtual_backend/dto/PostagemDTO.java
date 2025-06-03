package com.ArqDSw.planetario_virtual_backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class PostagemDTO {

    @NotBlank(message = "Text cannot be blank")
    private String texto;

    @NotNull(message = "Author ID cannot be null")
    private Long autorId;

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Long getAutorId() {
        return autorId;
    }

    public void setAutorId(Long autorId) {
        this.autorId = autorId;
    }
}