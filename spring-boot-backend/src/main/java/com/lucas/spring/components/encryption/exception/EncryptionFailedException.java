package com.lucas.spring.components.encryption.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.encryption.enums.EncryptionFailedEnums;

/**
 * Thrown when something happened during the encryption or
 * decryption of a text.
 */
public class EncryptionFailedException extends BaseException {
  /**
   * Throws an error message.
   *
   * @param message The error message to display in the console.
   * @param param The param which initiated the exception.
   */
  public EncryptionFailedException(final EncryptionFailedEnums message, final Object... param) {
    super(message, param);
  }
}
