package com.lucas.spring.components.procedure.repository;

import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link BoundingBoxRepository}.
 */
@Repository
public interface BoundingBoxRepository extends JpaRepository<BoundingBoxEntity, Long> {
}
