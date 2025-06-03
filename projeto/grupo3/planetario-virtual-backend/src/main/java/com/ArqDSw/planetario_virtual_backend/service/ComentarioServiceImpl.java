package com.ArqDSw.planetario_virtual_backend.service;

import com.ArqDSw.planetario_virtual_backend.dto.ComentarioResponseDTO;
import com.ArqDSw.planetario_virtual_backend.model.Comentario;
import com.ArqDSw.planetario_virtual_backend.model.Postagem;
import com.ArqDSw.planetario_virtual_backend.repository.ComentarioRepository;
import com.ArqDSw.planetario_virtual_backend.repository.PostagemRepository;
import com.ArqDSw.planetario_virtual_backend.command.Command;
import com.ArqDSw.planetario_virtual_backend.command.CriarComentarioCommand;
import com.ArqDSw.planetario_virtual_backend.command.EditarComentarioCommand;
import com.ArqDSw.planetario_virtual_backend.command.ExcluirComentarioCommand;
import com.ArqDSw.planetario_virtual_backend.command.LikeComentarioCommand;
import com.ArqDSw.planetario_virtual_backend.command.DislikeComentarioCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComentarioServiceImpl implements ComentarioService {

    private final ComentarioRepository comentarioRepository;
    private final PostagemRepository postagemRepository;

    @Autowired
    public ComentarioServiceImpl(ComentarioRepository comentarioRepository, PostagemRepository postagemRepository) {
        this.comentarioRepository = comentarioRepository;
        this.postagemRepository = postagemRepository;
    }


    public Command criarComentarioCommand(Comentario comentario) {
        return new CriarComentarioCommand(comentarioRepository, comentario);
    }

    public Command editarComentarioCommand(String id, String novoTexto) {
        return new EditarComentarioCommand(comentarioRepository, id, novoTexto);
    }

    public Command excluirComentarioCommand(String id) {
        return new ExcluirComentarioCommand(comentarioRepository, id);
    }

    @Override
    public Command likeComentarioCommand(String id) {
        return new LikeComentarioCommand(comentarioRepository, id);
    }

    @Override
    public Command dislikeComentarioCommand(String id) {
        return new DislikeComentarioCommand(comentarioRepository, id);
    }

    @Override
    public ComentarioResponseDTO buscarPorId(String id) {
        Comentario comentario = comentarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comentário não encontrado"));
        return convertToDTO(comentario);
    }

    @Override
    public List<ComentarioResponseDTO> buscarTodosPorPostagem(String postagemId) {
        Postagem postagem = postagemRepository.findById(Long.valueOf(postagemId))
                .orElseThrow(() -> new RuntimeException("Postagem não encontrada com ID: " + postagemId));
        return postagem.getComentarios().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public ComentarioResponseDTO convertToDTO(Comentario comentario) {
        ComentarioResponseDTO dto = new ComentarioResponseDTO();
        dto.setId(comentario.getId());
        dto.setTexto(comentario.getTexto());
        dto.setDataCriacao(comentario.getDataCriacao());
        dto.setTotalCurtidas(comentario.getTotalCurtidas());
        dto.setTotalNaoCurtidas(comentario.getTotalNaoCurtidas());

        if (comentario.getAutor() != null && comentario.getAutor().getId() != null) {
            dto.setAutorId(String.valueOf(comentario.getAutor().getId()));
        }

        if (comentario.getPostagem() != null && comentario.getPostagem().getId() != null) {
            dto.setPostagemId(String.valueOf(comentario.getPostagem().getId()));
        }
        return dto;
    }
}