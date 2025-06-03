package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.dto.PostagemDTO;
import com.ArqDSw.planetario_virtual_backend.model.Postagem;
import com.ArqDSw.planetario_virtual_backend.model.User;
import com.ArqDSw.planetario_virtual_backend.repository.PostagemRepository;

import java.time.LocalDateTime;

public class CreatePostagemCommand implements Command {
    private final PostagemRepository postagemRepository;
    private final User autor;
    private final PostagemDTO postagemDTO;

    public CreatePostagemCommand(PostagemRepository postagemRepository, User autor, PostagemDTO postagemDTO) {
        this.postagemRepository = postagemRepository;
        this.autor = autor;
        this.postagemDTO = postagemDTO;
    }

    @Override
    public Object execute() {
        Postagem newPostagem = new Postagem.PostagemBuilder()
                .texto(postagemDTO.getTexto())
                .autor(autor)
                .dataCriacao(LocalDateTime.now())
                .totalCurtidas(0)
                .totalNaoCurtidas(0)
                .build();
        return postagemRepository.save(newPostagem);
    }
}