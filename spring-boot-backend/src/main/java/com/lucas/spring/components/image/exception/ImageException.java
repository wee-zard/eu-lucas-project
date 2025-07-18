package com.lucas.spring.components.image.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.image.enums.ImageExceptionEnums;

/**
 * Custom-made Image exception that is thrown,
 * when there is a problem with the images.
 */
public class ImageException extends BaseException {
  /**
   * Init the thrown exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to throw.
   */
  public ImageException(final ImageExceptionEnums message, final Object... param) {
    super(message, param);
  }
}
