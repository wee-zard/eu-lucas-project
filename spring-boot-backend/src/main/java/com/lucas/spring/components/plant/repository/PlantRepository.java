package com.lucas.spring.components.plant.repository;

import com.lucas.spring.components.plant.model.entity.PlantEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link PlantEntity}.
 */
@Repository
public interface PlantRepository extends JpaRepository<PlantEntity, String> {
  /**
   * Fetches a {@link PlantEntity} by their scientific name if its exists.
   *
   * @param name The scientific name of the plant.
   * @return Returns a {@link PlantEntity} if its exists.
   */
  Optional<PlantEntity> findPlantScientificNameByPlantScientificName(String name);
}
