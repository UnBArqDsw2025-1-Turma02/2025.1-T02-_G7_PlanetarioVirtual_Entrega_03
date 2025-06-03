package com.ArqDSw.planetario_virtual_backend.service;

import com.ArqDSw.planetario_virtual_backend.dto.ComentarioResponseDTO;
import com.ArqDSw.planetario_virtual_backend.dto.PostagemDTO;
import com.ArqDSw.planetario_virtual_backend.dto.PostagemResponseDTO;
import com.ArqDSw.planetario_virtual_backend.exception.UserNotFoundException;
import com.ArqDSw.planetario_virtual_backend.model.Postagem;
import com.ArqDSw.planetario_virtual_backend.model.User;
import com.ArqDSw.planetario_virtual_backend.repository.PostagemRepository;
import com.ArqDSw.planetario_virtual_backend.repository.UserRepository;
import com.ArqDSw.planetario_virtual_backend.command.Command;
import com.ArqDSw.planetario_virtual_backend.command.CreatePostagemCommand;
import com.ArqDSw.planetario_virtual_backend.command.UpdatePostagemCommand;
import com.ArqDSw.planetario_virtual_backend.command.LikePostagemCommand;
import com.ArqDSw.planetario_virtual_backend.command.DislikePostagemCommand;
import com.ArqDSw.planetario_virtual_backend.command.DeletePostagemCommand;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostagemService {

    private final PostagemRepository postagemRepository;
    private final UserRepository userRepository;
    private final ComentarioService comentarioService;

    @Autowired
    public PostagemService(PostagemRepository postagemRepository, UserRepository userRepository, ComentarioService comentarioService) {
        this.postagemRepository = postagemRepository;
        this.userRepository = userRepository;
        this.comentarioService = comentarioService;
    }

    public List<PostagemResponseDTO> getAllPostagens() {
        return postagemRepository.findAll().stream()
                .map(this::convertToResponseDTO)
                .collect(Collectors.toList());
    }

    public PostagemResponseDTO getPostagemById(Long id) {
        Postagem postagem = postagemRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Postagem not found with id: " + id));
        return convertToResponseDTO(postagem);
    }

    public Command createPostagemCommand(PostagemDTO postagemDTO) {
        User autor = userRepository.findById(postagemDTO.getAutorId())
                .orElseThrow(() -> new UserNotFoundException("Author not found with id: " + postagemDTO.getAutorId()));
        return new CreatePostagemCommand(postagemRepository, autor, postagemDTO);
    }

    public Command updatePostagemCommand(Long id, PostagemDTO postagemDTO) {
        return new UpdatePostagemCommand(postagemRepository, id, postagemDTO);
    }

    public Command likePostagemCommand(Long id) {
        return new LikePostagemCommand(postagemRepository, id);
    }

    public Command dislikePostagemCommand(Long id) {
        return new DislikePostagemCommand(postagemRepository, id);
    }

    public Command deletePostagemCommand(Long id) {
        return new DeletePostagemCommand(postagemRepository, id);
    }

    public PostagemResponseDTO convertToResponseDTO(Postagem postagem) {
        String autorName = postagem.getAutor() != null ? postagem.getAutor().getName() : null;
        String autorEmail = postagem.getAutor() != null ? postagem.getAutor().getEmail() : null;

        List<ComentarioResponseDTO> comentariosDTO = postagem.getComentarios().stream()
                .map(comentarioService::convertToDTO)
                .collect(Collectors.toList());

        return new PostagemResponseDTO(
                postagem.getId(),
                postagem.getTexto(),
                postagem.getAutor() != null ? postagem.getAutor().getId() : null,
                autorName,
                autorEmail,
                postagem.getDataCriacao(),
                postagem.getTotalCurtidas(),
                postagem.getTotalNaoCurtidas()
        );
    }
}