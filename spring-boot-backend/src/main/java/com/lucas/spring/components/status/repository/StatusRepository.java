package com.lucas.spring.components.status.repository;

import com.lucas.spring.components.status.model.entity.StatusEntity;
import java.util.ArrayList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * The Crud repository of the Status entities.
 */
public interface StatusRepository extends JpaRepository<StatusEntity, Long> {
}
