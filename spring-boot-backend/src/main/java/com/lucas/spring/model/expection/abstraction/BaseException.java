package com.lucas.spring.model.expection.abstraction;

import lombok.Getter;

/**
 * The root class of all Exceptions that is thrown from the app.
 */
@Getter
public abstract class BaseException extends RuntimeException {
  /**
   * Tells that at which param the error message is thrown error.
   */
  private final String errorAtParam;

  /**
   * Throws an error message.
   *
   * @param message The error message to display in the console.
   */
  protected BaseException(final String message) {
    super(message);
    this.errorAtParam = null;
  }

  /**
   * Throws an error message, with an additional parameter where
   * the error occurred.
   *
   * @param message The error message to display in the console.
   * @param errorAtParam The param which initiated the exception.
   */
  protected BaseException(final String message, final String errorAtParam) {
    super(message);
    this.errorAtParam = errorAtParam;
  }
}
