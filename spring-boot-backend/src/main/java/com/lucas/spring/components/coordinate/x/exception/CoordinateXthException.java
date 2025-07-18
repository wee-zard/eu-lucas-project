package com.lucas.spring.components.coordinate.x.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.coordinate.x.enums.CoordinateXthExceptionEnum;

/**
 * If the x coordinate is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which coordinate is missing from the db.
 */
public class CoordinateXthException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public CoordinateXthException(final CoordinateXthExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
