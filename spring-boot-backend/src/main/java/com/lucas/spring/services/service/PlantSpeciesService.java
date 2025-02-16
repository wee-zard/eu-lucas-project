package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.PlantSpeciesEntity;
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
