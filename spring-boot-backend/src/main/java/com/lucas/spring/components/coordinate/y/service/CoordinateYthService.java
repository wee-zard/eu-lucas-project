package com.lucas.spring.components.coordinate.y.service;

import com.lucas.spring.components.coordinate.y.model.entity.CoordinateYthEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the Y coordinates of the images.
 */
@Service
public interface CoordinateYthService {
  /**
   * Fetch the list of y coordinate from which the image was taken.
   *
   * @return List of coordinates.
   */
  List<CoordinateYthEntity> getCoordinateYs();

  /**
   * Fetch the y coordinate from which the image was taken.
   *
   * @param coordinateY the y coordinate to fetch by from the db.
   * @return a coordinate.
   */
  CoordinateYthEntity getCoordinateY(Integer coordinateY);

  /**
   * Saves the y coordinate.
   *
   * @param coordinateY the y coordinate from which the image was taken.
   */
  void addCoordinateY(Integer coordinateY);

  /**
   * Checks if the provided y coordinate is already exists in the db.
   * If not, then we add it to the db.
   *
   * @param coordinateY the y coordinate from which the image was taken.
   */
  void isCoordinateIncludedInTheDb(Integer coordinateY);
}
