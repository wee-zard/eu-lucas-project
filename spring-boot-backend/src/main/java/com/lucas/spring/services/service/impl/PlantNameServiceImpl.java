package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.PlantNameRepository;
import com.lucas.spring.model.entity.PlantNameEntity;
import com.lucas.spring.services.service.PlantNameService;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link PlantNameService}.
 */
@Service
@AllArgsConstructor
public class PlantNameServiceImpl implements PlantNameService {
  private final PlantNameRepository plantNameRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public PlantNameEntity createPlantName(final String name) {
    return plantNameRepository.save(PlantNameEntity.builder().plantScientificName(name).build());
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<PlantNameEntity> getPlantNameByName(final String name) {
    return plantNameRepository.getEntityByName(name);
  }

  @Override
  public PlantNameEntity getPlantNameByNameAndInitIfNotExists(String name) {
    return getPlantNameByName(name).orElseGet(() -> createPlantName(name));
  }
}
