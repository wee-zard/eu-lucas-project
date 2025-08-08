package com.lucas.spring.commons.handler;

import com.lucas.spring.commons.exception.AuthorizationException;
import com.lucas.spring.commons.exception.abstraction.BaseException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.server.ResponseStatusException;

/**
 * Handles all the exceptions thrown from the backend.
 */
@ControllerAdvice
public class BaseExceptionHandler {

  /**
   * Throws unauthorized error exception.
   *
   * @param ex The exception to throw to back to the frontend.
   */
  @ExceptionHandler(AuthorizationException.class)
  public ResponseStatusException throwPermissionDeniedException(final AuthorizationException ex) {
    return new ResponseStatusException(HttpStatus.UNAUTHORIZED, ex.getMessage(), ex);
  }

  /**
   * Throws bad gateway exception, if the provided exception
   * is extended from the {@link BaseException} class.
   *
   * @param ex The exception to throw to back to the frontend.
   */
  @ExceptionHandler(BaseException.class)
  public ResponseStatusException throwResponseStatusException(final BaseException ex) {
    return new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
  }
}
