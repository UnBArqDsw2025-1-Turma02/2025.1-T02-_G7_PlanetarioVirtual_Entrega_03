package com.ArqDSw.planetario_virtual_backend.service;

import com.ArqDSw.planetario_virtual_backend.dto.ComentarioResponseDTO;
import com.ArqDSw.planetario_virtual_backend.model.Comentario;
import com.ArqDSw.planetario_virtual_backend.command.Command;

import java.util.List;

public interface ComentarioService {

    Command criarComentarioCommand(Comentario comentario);
    Command editarComentarioCommand(String id, String novoTexto);
    Command excluirComentarioCommand(String id);
    Command likeComentarioCommand(String id);
    Command dislikeComentarioCommand(String id);

    ComentarioResponseDTO buscarPorId(String id);
    List<ComentarioResponseDTO> buscarTodosPorPostagem(String postagemId);
    ComentarioResponseDTO convertToDTO(Comentario comentario);
}