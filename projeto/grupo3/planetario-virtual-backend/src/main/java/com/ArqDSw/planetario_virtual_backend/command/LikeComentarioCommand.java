package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.model.Comentario;
import com.ArqDSw.planetario_virtual_backend.repository.ComentarioRepository;

public class LikeComentarioCommand implements Command {
    private final ComentarioRepository comentarioRepository;
    private final String comentarioId;

    public LikeComentarioCommand(ComentarioRepository comentarioRepository, String comentarioId) {
        this.comentarioRepository = comentarioRepository;
        this.comentarioId = comentarioId;
    }

    @Override
    public Object execute() {
        Comentario comentario = comentarioRepository.findById(comentarioId)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado com ID: " + comentarioId));
        comentario.like();
        return comentarioRepository.save(comentario);
    }
}