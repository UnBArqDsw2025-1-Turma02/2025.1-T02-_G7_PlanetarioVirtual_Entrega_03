package com.ArqDSw.planetario_virtual_backend.command;

import com.ArqDSw.planetario_virtual_backend.model.Comentario;
import com.ArqDSw.planetario_virtual_backend.repository.ComentarioRepository;

public class EditarComentarioCommand implements Command {
    private final ComentarioRepository comentarioRepository;
    private final String comentarioId;
    private final String novoTexto;

    public EditarComentarioCommand(ComentarioRepository comentarioRepository, String comentarioId, String novoTexto) {
        this.comentarioRepository = comentarioRepository;
        this.comentarioId = comentarioId;
        this.novoTexto = novoTexto;
    }

    @Override
    public Object execute() {
        Comentario comentario = comentarioRepository.findById(comentarioId)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado"));
        comentario.setTexto(novoTexto);
        return comentarioRepository.save(comentario);
    }
}