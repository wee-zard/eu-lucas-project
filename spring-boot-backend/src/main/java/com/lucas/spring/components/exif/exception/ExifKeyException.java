package com.lucas.spring.components.exif.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.exif.enums.ExifKeyExceptionEnum;

/**
 * Custom throwable exception about the Exif keys.
 */
public class ExifKeyException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public ExifKeyException(final ExifKeyExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
