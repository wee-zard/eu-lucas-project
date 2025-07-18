package com.lucas.spring.components.plant.repository;

import com.lucas.spring.components.plant.model.entity.PlantNameEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link PlantNameEntity}.
 */
@Repository
public interface PlantNameRepository extends JpaRepository<PlantNameEntity, String> {
}
