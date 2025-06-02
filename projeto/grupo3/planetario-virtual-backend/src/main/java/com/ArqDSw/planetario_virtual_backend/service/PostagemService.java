package com.ArqDSw.planetario_virtual_backend.service;

import com.ArqDSw.planetario_virtual_backend.dto.PostagemDTO;
import com.ArqDSw.planetario_virtual_backend.dto.PostagemResponseDTO;
import com.ArqDSw.planetario_virtual_backend.exception.UserNotFoundException;
import com.ArqDSw.planetario_virtual_backend.model.Postagem;
import com.ArqDSw.planetario_virtual_backend.model.User;
import com.ArqDSw.planetario_virtual_backend.repository.PostagemRepository;
import com.ArqDSw.planetario_virtual_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostagemService {

    private final PostagemRepository postagemRepository;
    private final UserRepository userRepository;
    @Autowired
    public PostagemService(PostagemRepository postagemRepository, UserRepository userRepository) {
        this.postagemRepository = postagemRepository;
        this.userRepository = userRepository;
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

    public PostagemResponseDTO createPostagem(PostagemDTO postagemDTO) {
        User autor = userRepository.findById(postagemDTO.getAutorId())
                .orElseThrow(() -> new UserNotFoundException("Author not found with id: " + postagemDTO.getAutorId()));

        Postagem newPostagem = new Postagem.PostagemBuilder()
                .texto(postagemDTO.getTexto())
                .autor(autor)
                .dataCriacao(LocalDateTime.now())
                .totalCurtidas(0)
                .totalNaoCurtidas(0)
                .build();

        Postagem savedPostagem = postagemRepository.save(newPostagem);
        return convertToResponseDTO(savedPostagem);
    }

    public PostagemResponseDTO updatePostagem(Long id, PostagemDTO postagemDTO) {
        Postagem existingPostagem = postagemRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Postagem not found with id: " + id));

        if (postagemDTO.getTexto() != null && !postagemDTO.getTexto().isBlank()) {
            existingPostagem.setTexto(postagemDTO.getTexto());
        }

     
        Postagem updatedPostagem = postagemRepository.save(existingPostagem);
        return convertToResponseDTO(updatedPostagem);
    }

    public PostagemResponseDTO likePostagem(Long id) {
        Postagem existingPostagem = postagemRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Postagem not found with id: " + id));
        existingPostagem.setTotalCurtidas(existingPostagem.getTotalCurtidas() + 1);
        Postagem updatedPostagem = postagemRepository.save(existingPostagem);
        return convertToResponseDTO(updatedPostagem);
    }

    public PostagemResponseDTO dislikePostagem(Long id) {
        Postagem existingPostagem = postagemRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("Postagem not found with id: " + id));
        existingPostagem.setTotalNaoCurtidas(existingPostagem.getTotalNaoCurtidas() + 1);
        Postagem updatedPostagem = postagemRepository.save(existingPostagem);
        return convertToResponseDTO(updatedPostagem);
    }

    public void deletePostagem(Long id) {
        if (!postagemRepository.existsById(id)) {
            throw new UserNotFoundException("Postagem not found with id: " + id);
        }
        postagemRepository.deleteById(id);
    }

    private PostagemResponseDTO convertToResponseDTO(Postagem postagem) {
        return new PostagemResponseDTO(
                postagem.getId(),
                postagem.getTexto(),
                postagem.getAutor() != null ? postagem.getAutor().getId() : null,
                postagem.getAutor() != null ? postagem.getAutor().getName() : null,
                postagem.getAutor() != null ? postagem.getAutor().getEmail() : null,
                postagem.getDataCriacao(),
                postagem.getTotalCurtidas(),
                postagem.getTotalNaoCurtidas()
        );
    }
}