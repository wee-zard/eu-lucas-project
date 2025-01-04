package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.PlantNameEntity;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 * Stores methods related to the {@link PlantNameEntity}.
 */
@Service
public interface PlantNameService {

  /**
   * Creates a new {@link PlantNameEntity}.
   *
   * @param name The scientific name of the plant.
   * @return Returns a new root {@link PlantNameEntity} object.
   */
  PlantNameEntity createPlantName(String name);

  /**
   * Fetch the {@link PlantNameEntity} from the db
   * by the scientific name of the plant if its exists.
   *
   * @param name The scientific name of the plant.
   * @return Returns a root {@link PlantNameEntity} object if exists.
   */
  Optional<PlantNameEntity> getPlantNameByName(String name);

  /**
   * Fetch the {@link PlantNameEntity} from the db
   * by the scientific name of the plant and init it if it
   * doest not exists.
   *
   * @param name The scientific name of the plant.
   * @return Returns a root {@link PlantNameEntity} object.
   */
  PlantNameEntity getPlantNameByNameAndInitIfNotExists(String name);
}
