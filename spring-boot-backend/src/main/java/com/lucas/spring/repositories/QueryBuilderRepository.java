package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.QueryBuilderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link QueryBuilderEntity}.
 */
@Repository
public interface QueryBuilderRepository extends JpaRepository<QueryBuilderEntity, Long> {
}
