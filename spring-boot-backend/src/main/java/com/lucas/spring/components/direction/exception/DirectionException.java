package com.lucas.spring.components.direction.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.direction.enums.DirectionExceptionEnum;

/**
 * Custom throwable exception about the directions.
 */
public class DirectionException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public DirectionException(final DirectionExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
