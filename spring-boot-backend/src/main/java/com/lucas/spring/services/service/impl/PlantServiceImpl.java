package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.PlantRepository;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.PlantEntity;
import com.lucas.spring.services.service.PlantService;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
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
    return plantRepository.findPlantScientificNameByPlantScientificName(name);
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

  /**
   * {@inheritDoc}
   */
  @Override
  public PlantEntity addImageEntityToPlant(
          final PlantEntity plantEntity,
          final ImageEntity imageEntity
  ) {
    // Is image already added to the plant?
    final boolean isImageNotAddedToPlant = plantEntity.getListOfImages()
            .stream()
            .filter(image -> image.getId().equals(imageEntity.getId()))
            .findFirst()
            .isEmpty();

    // Add image to plant if possible.
    if (isImageNotAddedToPlant) {
      // Return the updates plant. Only updates the db if the Set<> is empty.
      Set<ImageEntity> imageEntities = new HashSet<>(plantEntity.getListOfImages());
      imageEntities.add(imageEntity);
      plantEntity.setListOfImages(imageEntities);
      return updatePlant(plantEntity);
    }
    // Return the non-updates plant.
    return plantEntity;
  }
}
