package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.PlantRepository;
import com.lucas.spring.model.entity.PlantEntity;
import com.lucas.spring.services.service.PlantService;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link PlantService}.
 */
@Service
@AllArgsConstructor
public class PlantServiceImpl implements PlantService {
  private final PlantRepository plantRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public PlantEntity createPlant(final String name, final Boolean isInvasive) {
    return updatePlant(new PlantEntity(name, isInvasive));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<PlantEntity> getPlantByName(String name) {
    return plantRepository.getEntityByName(name);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public PlantEntity getPlantByNameAndInitIfNotExists(final String name, final Boolean isInvasive) {
    return getPlantByName(name).orElseGet(() -> createPlant(name, isInvasive));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public PlantEntity updatePlant(final PlantEntity plantEntity) {
    return plantRepository.save(plantEntity);
  }
}
