package com.lucas.spring.components.direction.repository;

import com.lucas.spring.components.direction.model.entity.CreationDirectionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The Crud repository of the Creation direction entities.
 */
@Repository
public interface CreationDirectionRepository
        extends JpaRepository<CreationDirectionEntity, String> {
}
