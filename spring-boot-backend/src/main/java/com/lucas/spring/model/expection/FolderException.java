package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.FolderExceptionEnum;
import com.lucas.spring.model.expection.abstraction.BaseException;

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
  public FolderException(
          final FolderExceptionEnum message,
          final String... param) {
    super(BaseException.getStringFormatOfParams(String.valueOf(message), param));
  }
}