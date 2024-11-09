package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * If a creation year is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which year is missing from the db.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class YearNotFoundException extends RuntimeException {
  /**
    * Displaying an error message about
    * the missing creation year record from the db.
    *
    * @param year The year which is missing from the db.
    */
  public YearNotFoundException(final int year) {
    super(String.format("Creation Year is not found in the server! %d", year));
  }
}
