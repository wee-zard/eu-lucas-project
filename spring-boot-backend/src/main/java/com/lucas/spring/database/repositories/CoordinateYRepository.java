package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.CoordinateYEntity;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

/**
 * The repository of the Y Coordinate of the images.
 */
public interface CoordinateYRepository extends CrudRepository<CoordinateYEntity, Integer> {
    @Query("SELECT new com.lucas.spring.model.entity.CoordinateYEntity(coordinate_y.coordinateY) "
            + "FROM CoordinateY coordinate_y")
    ArrayList<CoordinateYEntity> fetchAllCoordinateYEntities();
}

