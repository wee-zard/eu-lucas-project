package com.lucas.spring.components.role.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.role.enums.RoleExceptionEnum;

/**
 * Custom throwable exception for the purpose of informing
 * Role specific errors.
 */
public class RoleException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public RoleException(final RoleExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
