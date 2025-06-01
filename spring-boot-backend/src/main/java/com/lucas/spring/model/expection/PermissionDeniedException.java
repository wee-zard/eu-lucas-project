package com.lucas.spring.model.expection;

import com.lucas.spring.model.expection.abstraction.BaseException;

/**
 * Custom-made Image exception that is thrown,
 * when there is a problem with the images.
 */
public class PermissionDeniedException extends BaseException {
  /**
   * Init the thrown exception.
   */
  public PermissionDeniedException() {
    super("You do not have permission to access these resources!");
  }
}
