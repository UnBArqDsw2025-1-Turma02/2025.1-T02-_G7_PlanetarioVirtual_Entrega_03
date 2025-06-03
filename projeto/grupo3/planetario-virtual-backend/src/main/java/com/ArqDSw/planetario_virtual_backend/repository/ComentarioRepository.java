package com.ArqDSw.planetario_virtual_backend.repository;

import com.ArqDSw.planetario_virtual_backend.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComentarioRepository extends JpaRepository<Comentario, String> {
}