package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.ExifKeyEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ExifKeyRepository extends CrudRepository<ExifKeyEntity, Long> {
    @Query("SELECT new com.lucas.spring.model.entity.ExifKeyEntity(e.id, e.exifKeyName) " +
            "FROM ExifKey e")
    ArrayList<ExifKeyEntity> fetchAllExifKeys();
}
