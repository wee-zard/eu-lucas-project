package com.lucas.spring.database_layer.repository;

import com.lucas.spring.model.entity.CreationDirectionEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CreationDirectionRepository extends CrudRepository<CreationDirectionEntity, String> {
    @Query("SELECT new com.lucas.spring.model.entity.CreationDirectionEntity(direction.directionName) " +
            "FROM CreationDirection direction")
    ArrayList<CreationDirectionEntity> fetchAllCreationDirections();
}
