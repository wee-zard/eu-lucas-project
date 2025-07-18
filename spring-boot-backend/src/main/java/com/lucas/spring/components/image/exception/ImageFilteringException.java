package com.lucas.spring.components.image.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.image.enums.ImageFilteringEnum;

/**
 * Custom-made Image Filtering exception that is thrown,
 * when there is a problem with the provided filters.
 */
public class ImageFilteringException extends BaseException {
  /**
   * Init the thrown exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to throw.
   */
  public ImageFilteringException(final ImageFilteringEnum message, final Object... param) {
    super(message, param);
  }
}
