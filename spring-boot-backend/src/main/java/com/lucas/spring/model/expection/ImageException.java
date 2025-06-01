package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.ImageExceptionEnums;
import com.lucas.spring.model.expection.abstraction.BaseException;

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
  public ImageException(
          final ImageExceptionEnums message,
          final String... param) {
    super(BaseException.getStringFormatOfParams(String.valueOf(message), param));
  }
}
