package com.lucas.spring.database_layer.repository;

import com.lucas.spring.model.entity.ImageEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

/**
 * TODO: In this table, there will be 1.5 or 3 million image record stored from the Lucas Image server.
 *   This table must be partitioned for the purpose of fetching the records faster.
 */
@Repository
public interface ImageRepository extends CrudRepository<ImageEntity, Integer> {
    @Query(nativeQuery = true, value = "SELECT image_name FROM image where image_name = :imageName")
    Optional<String> isImageNameAlreadyExists(@Param("imageName") String imageName);

    @Query(nativeQuery = true, value = "SELECT * from image order by Rand() Limit 1")
    Optional<ImageEntity> getRandomImage();

    @Query(nativeQuery = true, value = "SELECT * from image order by Rand() Limit 9")
    ArrayList<ImageEntity> getRandomImages();
}
