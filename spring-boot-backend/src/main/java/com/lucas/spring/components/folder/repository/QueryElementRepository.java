package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.QueryElementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link QueryElementEntity}.
 */
@Repository
public interface QueryElementRepository extends JpaRepository<QueryElementEntity, Long> {
}
