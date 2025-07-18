package com.lucas.spring.components.plant.service;

import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 * Stores methods related to {@link PlantEntity}.
 */
@Service
public interface PlantService {

  /**
   * Fetch the list of plants.
   *
   * @return Returns the list of plants.
   */
  List<PlantEntity> getPlants();

  /**
   * Creates a new {@link PlantEntity}.
   *
   * @param name The scientific name of the plant.
   * @param isInvasive Tells whether the plant is invasive or not.
   * @return Returns a new root {@link PlantEntity} object.
   */
  PlantEntity createPlant(String name, Boolean isInvasive);

  /**
   * Fetch the {@link PlantEntity} from the db
   * by the scientific name of the plant if its exists.
   *
   * @param name The scientific name of the plant.
   * @return Returns a new root {@link PlantEntity} object if its exists.
   */
  Optional<PlantEntity> getPlantByName(String name);

  /**
   * Fetch the {@link PlantEntity} from the db
   * by the scientific name of the plant.
   *
   * @param name The scientific name of the plant.
   * @param isInvasive Tells whether the plant is invasive or not.
   * @return Returns a new root {@link PlantEntity} object.
   */
  PlantEntity getPlantByNameAndInitIfNotExists(String name, Boolean isInvasive);

  /**
   * Overrides the previous entity object in the db
   * and replaces it with the one what is provided in the param.
   *
   * @param plantEntity The updated entity we want to save.
   */
  PlantEntity updatePlant(PlantEntity plantEntity);

  /**
   * Add {@link ImageEntity} to the provided {@link PlantEntity}.
   * This will create a relation between the plant and the image.
   *
   * @param plantEntity The plant which we want to add the image.
   * @param imageEntity The image we want to add to the plant.
   * @return Returns a {@link PlantEntity}.
   */
  PlantEntity addImageEntityToPlant(PlantEntity plantEntity, ImageEntity imageEntity);
}
