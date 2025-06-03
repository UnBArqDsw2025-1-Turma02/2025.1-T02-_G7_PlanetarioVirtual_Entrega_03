package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.repository.ComentarioRepository;

public class ExcluirComentarioCommand implements Command {
    private final ComentarioRepository comentarioRepository;
    private final String comentarioId;

    public ExcluirComentarioCommand(ComentarioRepository comentarioRepository, String comentarioId) {
        this.comentarioRepository = comentarioRepository;
        this.comentarioId = comentarioId;
    }

    @Override
    public Object execute() {
        comentarioRepository.deleteById(comentarioId);
        return null; 
    }
}