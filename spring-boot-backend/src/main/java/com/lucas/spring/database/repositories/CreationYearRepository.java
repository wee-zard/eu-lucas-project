package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.CreationYearEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CreationYearRepository extends CrudRepository<CreationYearEntity, Integer> {

    @Query("SELECT new com.lucas.spring.model.entity.CreationYearEntity(years.year) FROM CreationYear years")
    ArrayList<CreationYearEntity> fetchAllCreationYear();
}
