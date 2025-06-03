package com.ArqDSw.planetario_virtual_backend.controller;

import com.ArqDSw.planetario_virtual_backend.dto.ComentarioResponseDTO;
import com.ArqDSw.planetario_virtual_backend.model.Comentario;
import com.ArqDSw.planetario_virtual_backend.service.ComentarioService;
import com.ArqDSw.planetario_virtual_backend.command.Command;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@Tag(name = "Comentário Management", description = "Endpoints for managing comments")
public class ComentarioController {

    private final ComentarioService comentarioService;

    @Autowired
    public ComentarioController(ComentarioService comentarioService) {
        this.comentarioService = comentarioService;
    }

    @PostMapping
    @Operation(summary = "Create a new comentário", description = "Create a new comentário entry")
    @ApiResponse(responseCode = "201", description = "Comentário successfully created")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Author not found")
    public ResponseEntity<ComentarioResponseDTO> criarComentario(@RequestBody Comentario comentario) {

        Command command = comentarioService.criarComentarioCommand(comentario);
        Comentario novoComentario = (Comentario) command.execute();
        ComentarioResponseDTO responseDTO = comentarioService.convertToDTO(novoComentario);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update comentário", description = "Update comentário information")
    @ApiResponse(responseCode = "200", description = "Comentário updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input")
    @ApiResponse(responseCode = "404", description = "Comentário not found")
    public ResponseEntity<ComentarioResponseDTO> editarComentario(
            @PathVariable String id,
            @RequestParam String texto) {

        Command command = comentarioService.editarComentarioCommand(id, texto);
        Comentario comentarioEditado = (Comentario) command.execute();
        ComentarioResponseDTO responseDTO = comentarioService.convertToDTO(comentarioEditado);
        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/{id}/like")
    @Operation(summary = "Like a comentário", description = "Increment the like count of a comentário")
    @ApiResponse(responseCode = "200", description = "Comentário liked successfully")
    @ApiResponse(responseCode = "404", description = "Comentário not found")
    public ResponseEntity<ComentarioResponseDTO> likeComentario(@PathVariable String id) {
        Command command = comentarioService.likeComentarioCommand(id);
        Comentario likedComentario = (Comentario) command.execute();
        ComentarioResponseDTO responseDTO = comentarioService.convertToDTO(likedComentario);
        return ResponseEntity.ok(responseDTO);
    }

    @PatchMapping("/{id}/dislike")
    @Operation(summary = "Dislike a comentário", description = "Increment the dislike count of a comentário")
    @ApiResponse(responseCode = "200", description = "Comentário disliked successfully")
    @ApiResponse(responseCode = "404", description = "Comentário not found")
    public ResponseEntity<ComentarioResponseDTO> dislikeComentario(@PathVariable String id) {
        Command command = comentarioService.dislikeComentarioCommand(id);
        Comentario dislikedComentario = (Comentario) command.execute();
        ComentarioResponseDTO responseDTO = comentarioService.convertToDTO(dislikedComentario);
        return ResponseEntity.ok(responseDTO);
    }


    @DeleteMapping("/{id}")
    @Operation(summary = "Delete comentário", description = "Delete a comentário by its ID")
    @ApiResponse(responseCode = "204", description = "Comentário deleted successfully")
    @ApiResponse(responseCode = "404", description = "Comentário not found")
    public ResponseEntity<Void> excluirComentario(@PathVariable String id) {

        Command command = comentarioService.excluirComentarioCommand(id);
        command.execute();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/postagem/{postagemId}")
    @Operation(summary = "Get comentário by ID", description = "Retrieve a specific comentário by its ID")
    @ApiResponse(responseCode = "200", description = "Comentário found and returned")
    @ApiResponse(responseCode = "404", description = "Comentário not found")
    public ResponseEntity<List<ComentarioResponseDTO>> buscarPorPostagem(
            @PathVariable String postagemId) {
        List<ComentarioResponseDTO> comentarios = comentarioService.buscarTodosPorPostagem(postagemId);
        return ResponseEntity.ok(comentarios);
    }
}