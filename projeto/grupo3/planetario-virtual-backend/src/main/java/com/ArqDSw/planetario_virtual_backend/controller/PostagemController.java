package com.ArqDSw.planetario_virtual_backend.controller;

import com.ArqDSw.planetario_virtual_backend.dto.PostagemDTO;
import com.ArqDSw.planetario_virtual_backend.dto.PostagemResponseDTO;
import com.ArqDSw.planetario_virtual_backend.service.PostagemService;
import com.ArqDSw.planetario_virtual_backend.command.Command;
import com.ArqDSw.planetario_virtual_backend.model.Postagem;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postagens")
@Tag(name = "Postagem Management", description = "Endpoints for managing posts")
public class PostagemController {

    private final PostagemService postagemService;

    public PostagemController(PostagemService postagemService) {
        this.postagemService = postagemService;
    }

    @GetMapping
    @Operation(summary = "Get all postagens", description = "Retrieve a list of all registered postagens")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list of postagens")
    public ResponseEntity<List<PostagemResponseDTO>> getAllPostagens() {
        List<PostagemResponseDTO> postagens = postagemService.getAllPostagens();
        return ResponseEntity.ok(postagens);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get postagem by ID", description = "Retrieve a specific postagem by its ID")
    @ApiResponse(responseCode = "200", description = "Postagem found and returned")
    @ApiResponse(responseCode = "404", description = "Postagem not found")
    public ResponseEntity<PostagemResponseDTO> getPostagemById(@PathVariable Long id) {
        PostagemResponseDTO postagem = postagemService.getPostagemById(id);
        return ResponseEntity.ok(postagem);
    }

    @PostMapping
    @Operation(summary = "Create a new postagem", description = "Create a new postagem entry")
    @ApiResponse(responseCode = "201", description = "Postagem successfully created")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Author not found")
    public ResponseEntity<PostagemResponseDTO> createPostagem(@Valid @RequestBody PostagemDTO postagemDTO) {
        Command command = postagemService.createPostagemCommand(postagemDTO);
        Postagem newPostagem = (Postagem) command.execute();
        return ResponseEntity.status(HttpStatus.CREATED).body(postagemService.convertToResponseDTO(newPostagem));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update postagem", description = "Update postagem information")
    @ApiResponse(responseCode = "200", description = "Postagem updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Postagem not found")
    public ResponseEntity<PostagemResponseDTO> updatePostagem(
            @PathVariable Long id,
            @Valid @RequestBody PostagemDTO postagemDTO) {
        Command command = postagemService.updatePostagemCommand(id, postagemDTO);
        Postagem updatedPostagem = (Postagem) command.execute();
        return ResponseEntity.ok(postagemService.convertToResponseDTO(updatedPostagem));
    }

    @PatchMapping("/{id}/like")
    @Operation(summary = "Like a postagem", description = "Increment the like count of a postagem")
    @ApiResponse(responseCode = "200", description = "Postagem liked successfully")
    @ApiResponse(responseCode = "404", description = "Postagem not found")
    public ResponseEntity<PostagemResponseDTO> likePostagem(@PathVariable Long id) {
        Command command = postagemService.likePostagemCommand(id);
        Postagem likedPostagem = (Postagem) command.execute();
        return ResponseEntity.ok(postagemService.convertToResponseDTO(likedPostagem));
    }

    @PatchMapping("/{id}/dislike")
    @Operation(summary = "Dislike a postagem", description = "Increment the dislike count of a postagem")
    @ApiResponse(responseCode = "200", description = "Postagem disliked successfully")
    @ApiResponse(responseCode = "404", description = "Postagem not found")
    public ResponseEntity<PostagemResponseDTO> dislikePostagem(@PathVariable Long id) {
        Command command = postagemService.dislikePostagemCommand(id);
        Postagem dislikedPostagem = (Postagem) command.execute();
        return ResponseEntity.ok(postagemService.convertToResponseDTO(dislikedPostagem));
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete postagem", description = "Delete a postagem by its ID")
    @ApiResponse(responseCode = "204", description = "Postagem deleted successfully")
    @ApiResponse(responseCode = "404", description = "Postagem not found")
    public ResponseEntity<Void> deletePostagem(@PathVariable Long id) {
        Command command = postagemService.deletePostagemCommand(id);
        command.execute();
        return ResponseEntity.noContent().build();
    }
}