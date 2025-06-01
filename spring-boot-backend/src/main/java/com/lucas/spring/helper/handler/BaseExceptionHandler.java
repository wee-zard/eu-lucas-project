package com.lucas.spring.helper.handler;

import com.lucas.spring.model.expection.PermissionDeniedException;
import com.lucas.spring.model.expection.abstraction.BaseException;
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
  @ExceptionHandler(PermissionDeniedException.class)
  public ResponseStatusException throwPermissionDeniedException(PermissionDeniedException ex) {
    return new ResponseStatusException(HttpStatus.UNAUTHORIZED, ex.getMessage(), ex);
  }

  /**
   * Throws bad gateway exception, if the provided exception
   * is extended from the {@link BaseException} class.
   *
   * @param ex The exception to throw to back to the frontend.
   */
  @ExceptionHandler(BaseException.class)
  public ResponseStatusException throwResponseStatusException(BaseException ex) {
    return new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
  }
}
