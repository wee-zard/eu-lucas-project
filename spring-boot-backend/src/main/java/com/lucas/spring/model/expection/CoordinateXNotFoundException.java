package com.lucas.spring.model.expection;

import com.lucas.spring.model.expection.abstraction.BaseException;

/**
 * If the x coordinate is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which coordinate is missing from the db.
 */
public class CoordinateXNotFoundException extends BaseException {
  /**
   * Displaying an error message about
   * the missing x coordinate record from the db.
   *
   * @param coordinateX The x coordinate which is missing from the db.
   */
  public CoordinateXNotFoundException(final Integer coordinateX) {
    super(String.format("X Coordinate is not found in the server! %s", coordinateX));
  }
}
