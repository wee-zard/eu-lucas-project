package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.PlantNameEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link PlantNameEntity}.
 */
@Repository
public interface PlantNameRepository extends CrudRepository<PlantNameEntity, String> {
}
