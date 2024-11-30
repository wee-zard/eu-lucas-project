package com.lucas.spring.model.expection.abstraction;

import jakarta.annotation.Nullable;
import lombok.Getter;

/**
 * The root class of all Exceptions that is thrown from the app.
 */
@Getter
public abstract class BaseException extends RuntimeException {
  /**
   * Tells that at which param the error message is thrown error.
   */
  private @Nullable String errorAtParam;

  public BaseException(final String message) {
    super(message);
  }

  public BaseException(final String message, final String errorAtParam) {
    super(message);
    this.errorAtParam = errorAtParam;
  }
}
