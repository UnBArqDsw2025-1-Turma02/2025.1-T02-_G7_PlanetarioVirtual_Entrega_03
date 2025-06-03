package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.exception.UserNotFoundException;
import com.ArqDSw.planetario_virtual_backend.repository.PostagemRepository;

public class DeletePostagemCommand implements Command {
    private final PostagemRepository postagemRepository;
    private final Long postId;

    public DeletePostagemCommand(PostagemRepository postagemRepository, Long postId) {
        this.postagemRepository = postagemRepository;
        this.postId = postId;
    }

    @Override
    public Object execute() {
        if (!postagemRepository.existsById(postId)) {
            throw new UserNotFoundException("Postagem not found with id: " + postId);
        }
        postagemRepository.deleteById(postId);
        return null; 
    }
}