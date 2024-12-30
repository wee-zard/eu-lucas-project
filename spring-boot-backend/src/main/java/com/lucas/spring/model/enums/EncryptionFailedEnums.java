package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Stores the possible error messages that could happen during the
 * encryption of decryption of texts.
 */
@Getter
@AllArgsConstructor
public enum EncryptionFailedEnums {
  ENCRYPTION_STRING_IS_EMPTY("The received Encrypted text is empty."),
  ENCRYPTION_FAILED("Encryption of the provided input is failed."),
  DECRYPTION_FAILED("Decryption of the provided input is failed.");

  /**
   * Displays the error message of the exception.
   */
  private final String errorMessage;
}
