package com.lucas.spring.components.coordinate.y.repository;

import com.lucas.spring.components.coordinate.y.model.entity.CoordinateYthEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The repository of the Y Coordinate of the images.
 */
@Repository
public interface CoordinateYthRepository extends JpaRepository<CoordinateYthEntity, Integer> {
}

