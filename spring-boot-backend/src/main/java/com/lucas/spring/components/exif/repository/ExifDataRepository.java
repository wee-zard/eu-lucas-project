package com.lucas.spring.components.exif.repository;

import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * TODO: In this table, there will be 10 or 20 million exif data
 *   record stored from the Lucas Image server.
 *   This table must be partitioned for the purpose of fetching the records faster.
 */
@Repository
public interface ExifDataRepository extends JpaRepository<ExifDataEntity, Long> {
}
