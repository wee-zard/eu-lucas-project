package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.PlantNameEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link PlantNameEntity}.
 */
@Repository
public interface PlantNameRepository extends CrudRepository<PlantNameEntity, String> {

  /**
   * Fetch a {@link PlantNameEntity} by a name.
   *
   * @param name The scientific name of the plant.
   * @return Returns a new root {@link PlantNameEntity} object.
   */
  @Query("SELECT p FROM PlantName p WHERE p.plantScientificName = :name")
  Optional<PlantNameEntity> getEntityByName(@Param("name") String name);
}
