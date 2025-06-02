package com.ArqDSw.planetario_virtual_backend.repository;

import com.ArqDSw.planetario_virtual_backend.model.Postagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostagemRepository extends JpaRepository<Postagem, Long> {
}