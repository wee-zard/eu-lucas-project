package com.lucas.spring.components.coordinate.x.repository;

import com.lucas.spring.components.coordinate.x.model.entity.CoordinateXthEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The repository of the X Coordinate of the images.
 */
@Repository
public interface CoordinateXthRepository extends JpaRepository<CoordinateXthEntity, Integer> {
}
