package com.lucas.spring.components.folder.repository;

import com.lucas.spring.components.folder.model.entity.QueryBuilderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link QueryBuilderEntity}.
 */
@Repository
public interface QueryBuilderRepository extends JpaRepository<QueryBuilderEntity, Long> {
}
