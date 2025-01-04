package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.BoundingBoxEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link BoundingBoxRepository}.
 */
@Repository
public interface BoundingBoxRepository extends CrudRepository<BoundingBoxEntity, Long> {
}
