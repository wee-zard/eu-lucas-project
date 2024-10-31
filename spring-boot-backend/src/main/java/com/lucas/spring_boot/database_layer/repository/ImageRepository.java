package com.lucas.spring_boot.database_layer.repository;

import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ImageRepository extends CrudRepository<ImageEntity, Integer> {
    @Query(nativeQuery = true, value = "SELECT image_name FROM image where image_name = :imageName")
    Optional<String> isImageNameAlreadyExists(@Param("imageName") String imageName);
}
