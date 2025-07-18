package com.lucas.spring.components.user.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.user.enums.UserExceptionEnum;

/**
 * Custom throwable exception for the purpose of informing
 * User specific errors.
 */
public class UserException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public UserException(final UserExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
