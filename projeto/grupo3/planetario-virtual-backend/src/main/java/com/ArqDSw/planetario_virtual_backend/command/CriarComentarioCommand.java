package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.model.Comentario;
import com.ArqDSw.planetario_virtual_backend.repository.ComentarioRepository;

public class CriarComentarioCommand implements Command {
    private final ComentarioRepository comentarioRepository;
    private final Comentario comentario;

    public CriarComentarioCommand(ComentarioRepository comentarioRepository, Comentario comentario) {
        this.comentarioRepository = comentarioRepository;
        this.comentario = comentario;
    }

    @Override
    public Object execute() {
        return comentarioRepository.save(comentario);
    }
}