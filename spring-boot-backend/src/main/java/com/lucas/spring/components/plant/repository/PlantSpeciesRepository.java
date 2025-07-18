package com.lucas.spring.components.plant.repository;

import com.lucas.spring.components.plant.model.entity.PlantSpeciesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link PlantSpeciesEntity}.
 */
@Repository
public interface PlantSpeciesRepository extends JpaRepository<PlantSpeciesEntity, String> {
}
