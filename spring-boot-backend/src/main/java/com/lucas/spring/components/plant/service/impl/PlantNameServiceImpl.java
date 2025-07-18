package com.lucas.spring.components.plant.service.impl;

import com.lucas.spring.components.plant.repository.PlantNameRepository;
import com.lucas.spring.components.plant.service.PlantNameService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Defines methods related to the image filtering.
 */
@Service
@AllArgsConstructor
public class PlantNameServiceImpl implements PlantNameService {
  private final PlantNameRepository plantNameRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void deleteAll() {
    plantNameRepository.deleteAll();
  }
}
