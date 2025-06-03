package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.exception.UserNotFoundException;
import com.ArqDSw.planetario_virtual_backend.model.Postagem;
import com.ArqDSw.planetario_virtual_backend.repository.PostagemRepository;

public class DislikePostagemCommand implements Command {
    private final PostagemRepository postagemRepository;
    private final Long postId;

    public DislikePostagemCommand(PostagemRepository postagemRepository, Long postId) {
        this.postagemRepository = postagemRepository;
        this.postId = postId;
    }

    @Override
    public Object execute() {
        Postagem existingPostagem = postagemRepository.findById(postId)
                .orElseThrow(() -> new UserNotFoundException("Postagem not found with id: " + postId));
        existingPostagem.setTotalNaoCurtidas(existingPostagem.getTotalNaoCurtidas() + 1);
        return postagemRepository.save(existingPostagem);
    }
}