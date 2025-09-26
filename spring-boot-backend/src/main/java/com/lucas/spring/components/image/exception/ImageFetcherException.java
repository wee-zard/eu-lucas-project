package com.lucas.spring.components.image.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.image.enums.ImageFetcherExceptionEnums;

/**
 * Custom-made Image Fetcher exception that is thrown,
 * when there is a problem with fetching the images or processing their properties.
 */
public class ImageFetcherException extends BaseException {
  /**
   * Init the thrown exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to throw.
   */
  public ImageFetcherException(final ImageFetcherExceptionEnums message, final Object... param) {
    super(message, param);
  }
}
