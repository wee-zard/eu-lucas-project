package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * If the y coordinate is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which coordinate is missing from the db.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CoordinateYNotFoundException extends RuntimeException {
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
