package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.QueryElementEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link QueryElementEntity}.
 */
@Repository
public interface QueryElementRepository extends JpaRepository<QueryElementEntity, Long> {
}
