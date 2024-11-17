package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.CoordinateYEntity;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

@Service
public interface CoordinateYService {
  /**
   * Fetch the list of y coordinate from which the image was taken.
   *
   * @return List of coordinates.
   */
  ArrayList<CoordinateYEntity> getCoordinateYs();

  /**
   * Fetch the y coordinate from which the image was taken.
   *
   * @param coordinateY the y coordinate to fetch by from the db.
   * @return a coordinate.
   */
  CoordinateYEntity getCoordinateY(Integer coordinateY);

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
  void isCoordinateYIncludedInTheDb(Integer coordinateY);
}
