package com.lucas.spring_boot.database_layer.repository;

import com.lucas.spring_boot.model_layer.entity.ExifKeyEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExifKeyRepository extends CrudRepository<ExifKeyEntity, Long> {
}
