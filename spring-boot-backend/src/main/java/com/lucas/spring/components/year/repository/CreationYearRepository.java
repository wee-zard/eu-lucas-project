package com.lucas.spring.components.year.repository;

import com.lucas.spring.components.year.model.entity.CreationYearEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link CreationYearEntity} for accessing and performing
 * database actions.
 */
@Repository
public interface CreationYearRepository extends JpaRepository<CreationYearEntity, Integer> {
}
