package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.PlantSpeciesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link PlantSpeciesEntity}.
 */
@Repository
public interface PlantSpeciesRepository extends JpaRepository<PlantSpeciesEntity, String> {
}
