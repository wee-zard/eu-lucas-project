package com.lucas.spring.database_layer.repository;

import com.lucas.spring.model.entity.StatusEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

public interface StatusRepository extends CrudRepository<StatusEntity, Long> {
    @Query("SELECT new com.lucas.spring.model.entity.StatusEntity(status.id, status.statusName) FROM Status status")
    ArrayList<StatusEntity> getStatuses();
}
