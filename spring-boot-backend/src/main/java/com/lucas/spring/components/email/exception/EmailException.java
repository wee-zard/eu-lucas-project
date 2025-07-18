package com.lucas.spring.components.email.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.email.enums.EmailExceptionEnum;

/**
 * Custom throwable exception for the purpose of informing
 * email specific exceptions.
 */
public class EmailException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public EmailException(final EmailExceptionEnum message, final Object... param) {
    super(message, param);
  }
}