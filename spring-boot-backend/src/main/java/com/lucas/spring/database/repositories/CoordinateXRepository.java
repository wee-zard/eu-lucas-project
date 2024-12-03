package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.CoordinateXEntity;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * The repository of the X Coordinate of the images.
 */
@Repository
public interface CoordinateXRepository extends CrudRepository<CoordinateXEntity, Integer> {
  @Query("SELECT new com.lucas.spring.model.entity.CoordinateXEntity(x.coordinateX) "
            + "FROM CoordinateX x")
  ArrayList<CoordinateXEntity> fetchAllCoordinateXEntities();
}
