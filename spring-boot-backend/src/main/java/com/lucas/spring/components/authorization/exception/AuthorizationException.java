package com.lucas.spring.components.authorization.exception;

import com.lucas.spring.components.authorization.enums.AuthorizationExceptionEnum;
import com.lucas.spring.commons.exception.abstraction.BaseException;

/**
 * Custom-made Image exception that is thrown,
 * when there is a problem with the images.
 */
public class AuthorizationException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public AuthorizationException(final AuthorizationExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
