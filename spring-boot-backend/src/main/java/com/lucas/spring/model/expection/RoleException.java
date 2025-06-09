package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.RoleExceptionEnum;
import com.lucas.spring.model.enums.UserExceptionEnum;
import com.lucas.spring.model.expection.abstraction.BaseException;

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
  public RoleException(
          final RoleExceptionEnum message,
          final String... param) {
    super(BaseException.getStringFormatOfParams(String.valueOf(message), param));
  }
}
