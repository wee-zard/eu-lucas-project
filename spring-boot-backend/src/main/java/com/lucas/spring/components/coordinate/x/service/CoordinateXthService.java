package com.lucas.spring.components.coordinate.x.service;

import com.lucas.spring.components.coordinate.x.model.entity.CoordinateXthEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the X coordinates of the images.
 */
@Service
public interface CoordinateXthService {
  /**
   * Fetch the list of x coordinate from which the image was taken.
   *
   * @return List of coordinates.
   */
  List<CoordinateXthEntity> getCoordinateXs();

  /**
   * Fetch the x coordinate from which the image was taken.
   *
   * @param coordinateX the x coordinate to fetch by from the db.
   * @return a coordinate.
   */
  CoordinateXthEntity getCoordinateX(Integer coordinateX);

  /**
   * Saves the x coordinate.
   *
   * @param coordinateX the x coordinate from which the image was taken.
   */
  void addCoordinateX(Integer coordinateX);

  /**
   * Checks if the provided x coordinate is already exists in the db.
   * If not, then we add it to the db.
   *
   * @param coordinateX the x coordinate from which the image was taken.
   */
  void isCoordinateIncludedInTheDb(Integer coordinateX);
}
