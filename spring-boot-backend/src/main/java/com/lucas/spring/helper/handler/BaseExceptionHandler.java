package com.lucas.spring.helper.handler;

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
   * Throws bad gateway exception, if the provided exception
   * is extended from the {@link BaseException} class.
   *
   * @param ex The exception to throw to back to the frontend.
   */
  @ExceptionHandler({BaseException.class})
  public void throwResponseStatusException(BaseException ex) throws ResponseStatusException {
    throw new ResponseStatusException(HttpStatus.BAD_GATEWAY, ex.getMessage(), ex);
  }

  /**
   * Throws internal server error.
   *
   * @param ex The exception to throw to back to the frontend.
   */
  @ExceptionHandler({RuntimeException.class})
  public void throwInternalServerError(RuntimeException ex) throws ResponseStatusException {
    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
  }
}
