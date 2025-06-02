package com.ArqDSw.planetario_virtual_backend.dto;

import java.time.LocalDateTime;

public class PostagemResponseDTO {
    private Long id;
    private String texto;
    private Long autorId;
    private String autorName;
    private String autorEmail;
    private LocalDateTime dataCriacao;
    private int totalCurtidas;
    private int totalNaoCurtidas;

    public PostagemResponseDTO(Long id, String texto, Long autorId, String autorName, String autorEmail, LocalDateTime dataCriacao, int totalCurtidas, int totalNaoCurtidas) {
        this.id = id;
        this.texto = texto;
        this.autorId = autorId;
        this.autorName = autorName;
        this.autorEmail = autorEmail;
        this.dataCriacao = dataCriacao;
        this.totalCurtidas = totalCurtidas;
        this.totalNaoCurtidas = totalNaoCurtidas;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getAutorName() {
        return autorName;
    }

    public void setAutorName(String autorName) {
        this.autorName = autorName;
    }

    public String getAutorEmail() {
        return autorEmail;
    }

    public void setAutorEmail(String autorEmail) {
        this.autorEmail = autorEmail;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public int getTotalCurtidas() {
        return totalCurtidas;
    }

    public void setTotalCurtidas(int totalCurtidas) {
        this.totalCurtidas = totalCurtidas;
    }

    public int getTotalNaoCurtidas() {
        return totalNaoCurtidas;
    }

    public void setTotalNaoCurtidas(int totalNaoCurtidas) {
        this.totalNaoCurtidas = totalNaoCurtidas;
    }
}