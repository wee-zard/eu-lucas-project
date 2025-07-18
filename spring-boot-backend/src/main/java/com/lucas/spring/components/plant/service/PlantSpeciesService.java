package com.lucas.spring.components.plant.service;

import com.lucas.spring.components.plant.model.entity.PlantSpeciesEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Stores methods related to {@link PlantSpeciesEntity}.
 */
@Service
public interface PlantSpeciesService {
  /**
   * Fetch the list of plant species.
   *
   * @return Returns the list of plant species.
   */
  List<PlantSpeciesEntity> getPlantSpecies();
}
