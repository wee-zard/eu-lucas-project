package com.lucas.spring.components.country.repository;

import com.lucas.spring.components.country.model.entity.CreationCountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository for the {@link CreationCountryEntity}.
 */
@Repository
public interface CreationCountryRepository extends JpaRepository<CreationCountryEntity, String> {
}
