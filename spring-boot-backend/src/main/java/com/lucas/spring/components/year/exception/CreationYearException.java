package com.lucas.spring.components.year.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.year.enums.CreationYearExceptionEnum;

/**
 * If a creation year is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which year is missing from the db.
 */
public class CreationYearException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public CreationYearException(final CreationYearExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
