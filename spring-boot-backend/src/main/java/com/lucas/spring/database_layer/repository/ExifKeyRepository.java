package com.lucas.spring.database_layer.repository;

import com.lucas.spring.model.entity.ExifKeyEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ExifKeyRepository extends CrudRepository<ExifKeyEntity, Long> {
    @Query("SELECT new com.lucas.spring.model.entity.ExifKeyEntity(exifKey.exifCode, exifKey.exifKeyName) " +
            "FROM ExifKey exifKey")
    ArrayList<ExifKeyEntity> fetchAllExifKeys();
}
