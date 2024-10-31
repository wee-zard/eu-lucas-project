package com.lucas.spring_boot.database_layer.repository;

import com.lucas.spring_boot.model_layer.entity.CreationYearEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CreationYearRepository extends CrudRepository<CreationYearEntity, Integer> {

    @Query("SELECT new com.lucas.spring_boot.model_layer.entity.CreationYearEntity(years.year) FROM CreationYear years")
    ArrayList<CreationYearEntity> fetchAllCreationYear();
}
