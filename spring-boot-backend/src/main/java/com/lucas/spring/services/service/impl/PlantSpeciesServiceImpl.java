package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.PlantSpeciesEntity;
import com.lucas.spring.repositories.PlantSpeciesRepository;
import com.lucas.spring.services.service.PlantSpeciesService;
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
