package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.UserExceptionEnum;
import com.lucas.spring.model.expection.abstraction.BaseException;

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
  public UserException(
          final UserExceptionEnum message,
          final String... param) {
    super(BaseException.getStringFormatOfParams(String.valueOf(message), param));
  }
}
