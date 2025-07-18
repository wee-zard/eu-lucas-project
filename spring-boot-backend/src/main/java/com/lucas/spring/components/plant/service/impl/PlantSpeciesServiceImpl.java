package com.lucas.spring.components.plant.service.impl;

import com.lucas.spring.components.plant.model.entity.PlantSpeciesEntity;
import com.lucas.spring.components.plant.repository.PlantSpeciesRepository;
import com.lucas.spring.components.plant.service.PlantSpeciesService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link PlantSpeciesService}.
 */
@Service
@AllArgsConstructor
public class PlantSpeciesServiceImpl implements PlantSpeciesService {
  private final PlantSpeciesRepository plantSpeciesRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public List<PlantSpeciesEntity> getPlantSpecies() {
    return plantSpeciesRepository.findAll();
  }
}
