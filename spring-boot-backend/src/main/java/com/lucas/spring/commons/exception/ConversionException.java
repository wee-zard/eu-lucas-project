package com.lucas.spring.commons.exception;

import com.lucas.spring.commons.enums.ConversionExceptionEnum;
import com.lucas.spring.commons.exception.abstraction.BaseException;

/**
 * Custom-made Input format exception that is thrown,
 * when the requested type format of the input is incorrect.
 * Such as, if {@link Number} is requested, but {@link String} was
 * provided, then this exception will be thrown.
 */
public class ConversionException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public ConversionException(final ConversionExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
