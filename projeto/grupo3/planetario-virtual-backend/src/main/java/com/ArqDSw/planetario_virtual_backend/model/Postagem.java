package com.ArqDSw.planetario_virtual_backend.model;

import com.ArqDSw.planetario_virtual_backend.composite.Publicacao;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="tb_postagens")
public class Postagem implements Publicacao {

    @Id
    @GeneratedValue
    private Long id;

    @Nonnull
    private String texto;

    @ManyToOne
    @JoinColumn(name = "autor_id")
    @Nonnull
    private User autor;

    @Nonnull
    private LocalDateTime dataCriacao;

    private int totalCurtidas;
    private int totalNaoCurtidas;

    @OneToMany(mappedBy = "postagem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comentario> comentarios = new ArrayList<>();

    public Postagem() {
    }

    private Postagem(PostagemBuilder builder) {
        this.id = builder.id;
        this.texto = builder.texto;
        this.autor = builder.autor;
        this.dataCriacao = builder.dataCriacao;
        this.totalCurtidas = builder.totalCurtidas;
        this.totalNaoCurtidas = builder.totalNaoCurtidas;
    }

    public Long getId() {
        return id;
    }

    public String getTexto() {
        return texto;
    }

    public User getAutor() {
        return autor;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public int getTotalCurtidas() {
        return totalCurtidas;
    }

    public int getTotalNaoCurtidas() {
        return totalNaoCurtidas;
    }

    public List<Comentario> getComentarios() {
        return comentarios;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setAutor(User autor) {
        this.autor = autor;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public void setTotalCurtidas(int totalCurtidas) {
        this.totalCurtidas = totalCurtidas;
    }

    public void setTotalNaoCurtidas(int totalNaoCurtidas) {
        this.totalNaoCurtidas = totalNaoCurtidas;
    }

    public void addComentario(Comentario comentario) {
        this.comentarios.add(comentario);
        comentario.setPostagem(this);
    }

    public void removeComentario(Comentario comentario) {
        this.comentarios.remove(comentario);
        comentario.setPostagem(null);
    }

    @Override
    public void like() {
        this.totalCurtidas++;
    }

    @Override
    public void dislike() {
        this.totalNaoCurtidas++;
    }

    public static class PostagemBuilder {
        private Long id;
        private String texto;
        private User autor;
        private LocalDateTime dataCriacao;
        private int totalCurtidas;
        private int totalNaoCurtidas;

        public PostagemBuilder id(Long id) {
            this.id = id;
            return this;
        }

        public PostagemBuilder texto(String texto) {
            this.texto = texto;
            return this;
        }

        public PostagemBuilder autor(User autor) {
            this.autor = autor;
            return this;
        }

        public PostagemBuilder dataCriacao(LocalDateTime dataCriacao) {
            this.dataCriacao = dataCriacao;
            return this;
        }

        public PostagemBuilder totalCurtidas(int totalCurtidas) {
            this.totalCurtidas = totalCurtidas;
            return this;
        }

        public PostagemBuilder totalNaoCurtidas(int totalNaoCurtidas) {
            this.totalNaoCurtidas = totalNaoCurtidas;
            return this;
        }

        public Postagem build() {
            return new Postagem(this);
        }
    }
}