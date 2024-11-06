package com.lucas.spring_boot.database_layer.repository;

import com.lucas.spring_boot.model_layer.entity.ExifDataEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * TODO: In this table, there will be 10 or 20 million exif data record stored from the Lucas Image server.
 *   This table must be partitioned for the purpose of fetching the records faster.
 */
@Repository
public interface ExifDataRepository extends CrudRepository<ExifDataEntity, Long> {
}
