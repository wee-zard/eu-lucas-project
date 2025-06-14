package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.EmailExceptionEnum;
import com.lucas.spring.model.expection.abstraction.BaseException;

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
  public EmailException(
          final EmailExceptionEnum message,
          final String... param) {
    super(BaseException.getStringFormatOfParams(String.valueOf(message), param));
  }
}