package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.PlantEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link PlantEntity}.
 */
@Repository
public interface PlantRepository extends CrudRepository<PlantEntity, String> {

  /**
   * Fetch a {@link PlantEntity} by a name.
   *
   * @param name The scientific name of the plant.
   * @return Returns a new root {@link PlantEntity} object.
   */
  @Query("SELECT p FROM Plant p where p.plantScientificName = :name")
  Optional<PlantEntity> getEntityByName(@Param("name") String name);
}
