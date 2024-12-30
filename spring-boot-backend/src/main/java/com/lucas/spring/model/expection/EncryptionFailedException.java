package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.EncryptionFailedEnums;
import com.lucas.spring.model.expection.abstraction.BaseException;

/**
 * Thrown when something happened during the encryption or
 * decryption of a text.
 */
public class EncryptionFailedException extends BaseException {

  /**
   * Throws an error message.
   *
   * @param message The error message to display in the console.
   */
  public EncryptionFailedException(final EncryptionFailedEnums message) {
    super(message.getErrorMessage());
  }

  /**
   * Throws an error message.
   *
   * @param message The error message to display in the console.
   * @param errorAtParam The param which initiated the exception.
   */
  public EncryptionFailedException(final EncryptionFailedEnums message, final String errorAtParam) {
    super(message.getErrorMessage(), errorAtParam);
  }
}
