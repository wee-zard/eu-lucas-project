package com.lucas.spring.components.coordinate.y.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.coordinate.y.enums.CoordinateYthExceptionEnum;

/**
 * If the y coordinate is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which coordinate is missing from the db.
 */
public class CoordinateYthException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public CoordinateYthException(final CoordinateYthExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
