package com.ArqDSw.planetario_virtual_backend.model;

import com.ArqDSw.planetario_virtual_backend.composite.Publicacao;

import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name="tb_comentarios")
public class Comentario implements Publicacao {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String texto;
    private Date dataCriacao;
    private int totalCurtidas;
    private int totalNaoCurtidas;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    private User autor;

    @ManyToOne
    @JoinColumn(name = "postagem_id")
    private Postagem postagem;

    public Comentario() {
        this.dataCriacao = new Date();
        this.totalCurtidas = 0;
        this.totalNaoCurtidas = 0;
    }

    public Comentario(User autor, Postagem postagem, String texto) {
        this();
        this.autor = autor;
        this.postagem = postagem;
        this.texto = texto;
    }

    public String getId() {
        return id;
    }

    public String getTexto() {
        return texto;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public int getTotalCurtidas() {
        return totalCurtidas;
    }

    public int getTotalNaoCurtidas() {
        return totalNaoCurtidas;
    }

    public User getAutor() {
        return autor;
    }

    public Postagem getPostagem() {
        return postagem;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public void setTotalCurtidas(int totalCurtidas) {
        this.totalCurtidas = totalCurtidas;
    }

    public void setTotalNaoCurtidas(int totalNaoCurtidas) {
        this.totalNaoCurtidas = totalNaoCurtidas;
    }

    public void setAutor(User autor) {
        this.autor = autor;
    }

    public void setPostagem(Postagem postagem) {
        this.postagem = postagem;
    }

    public void editar(String novoTexto) {
        this.texto = novoTexto;
    }

    @Override
    public void like() {
        this.totalCurtidas++;
    }

    @Override
    public void dislike() {
        this.totalNaoCurtidas++;
    }

    public boolean excluir() {
        return true;
    }
}