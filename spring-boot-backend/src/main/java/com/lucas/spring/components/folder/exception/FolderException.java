package com.lucas.spring.components.folder.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.folder.enums.FolderExceptionEnum;

/**
 * Custom throwable exception for the purpose of informing
 * error related to the Folders.
 */
public class FolderException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public FolderException(final FolderExceptionEnum message, final Object... param) {
    super(message, param);
  }
}