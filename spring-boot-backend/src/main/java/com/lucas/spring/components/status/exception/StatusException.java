package com.lucas.spring.components.status.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.status.enums.StatusExceptionEnum;

/**
 * Custom throwable exception about the Statuses.
 */
public class StatusException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public StatusException(final StatusExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
