package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.dto.PostagemDTO;
import com.ArqDSw.planetario_virtual_backend.exception.UserNotFoundException;
import com.ArqDSw.planetario_virtual_backend.model.Postagem;
import com.ArqDSw.planetario_virtual_backend.repository.PostagemRepository;

public class UpdatePostagemCommand implements Command {
    private final PostagemRepository postagemRepository;
    private final Long postId;
    private final PostagemDTO postagemDTO;

    public UpdatePostagemCommand(PostagemRepository postagemRepository, Long postId, PostagemDTO postagemDTO) {
        this.postagemRepository = postagemRepository;
        this.postId = postId;
        this.postagemDTO = postagemDTO;
    }

    @Override
    public Object execute() {
        Postagem existingPostagem = postagemRepository.findById(postId)
                .orElseThrow(() -> new UserNotFoundException("Postagem not found with id: " + postId));

        if (postagemDTO.getTexto() != null && !postagemDTO.getTexto().isBlank()) {
            existingPostagem.setTexto(postagemDTO.getTexto());
        }
        return postagemRepository.save(existingPostagem);
    }
}