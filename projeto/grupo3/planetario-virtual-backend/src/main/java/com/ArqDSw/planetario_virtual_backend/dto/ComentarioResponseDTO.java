package com.ArqDSw.planetario_virtual_backend.dto;

import java.util.Date;

public class ComentarioResponseDTO {
    private String id;
    private String texto;
    private Date dataCriacao;
    private int totalCurtidas;
    private int totalNaoCurtidas;
    private String autorId;
    private String postagemId;

    public ComentarioResponseDTO() {
    }

    public ComentarioResponseDTO(String id, String texto, Date dataCriacao, int totalCurtidas, 
                                int totalNaoCurtidas, String autorId, String postagemId) {
        this.id = id;
        this.texto = texto;
        this.dataCriacao = dataCriacao;
        this.totalCurtidas = totalCurtidas;
        this.totalNaoCurtidas = totalNaoCurtidas;
        this.autorId = autorId;
        this.postagemId = postagemId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
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

    public String getAutorId() {
        return autorId;
    }

    public void setAutorId(String autorId) {
        this.autorId = autorId;
    }

    public String getPostagemId() {
        return postagemId;
    }

    public void setPostagemId(String postagemId) {
        this.postagemId = postagemId;
    }
}