package com.lucas.spring.model.expection;

import com.lucas.spring.model.expection.abstraction.BaseException;

/**
 * If the y coordinate is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which coordinate is missing from the db.
 */
public class CoordinateYNotFoundException extends BaseException {
  /**
   * Displaying an error message about
   * the missing y coordinate record from the db.
   *
   * @param coordinateY The y coordinate which is missing from the db.
   */
  public CoordinateYNotFoundException(final Integer coordinateY) {
    super(String.format("Y Coordinate is not found in the server! %s", coordinateY));
  }
}
