package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.CreationDirectionEntity;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * The Crud repository of the Creation direction entities.
 */
@Repository
public interface CreationDirectionRepository
        extends CrudRepository<CreationDirectionEntity, String> {

  /**
   * Returns the list of directions.
   *
   * @return Returns the list of directions.
   */
  @Query("SELECT new com.lucas.spring.model.entity.CreationDirectionEntity("
          + "direction.directionName"
          + ") FROM CreationDirection direction")
  ArrayList<CreationDirectionEntity> fetchAllCreationDirections();
}
