/**
 * This module is about throwing a Country that is not exist in the db.
 * <p>
 * With the name of the country, the user could be informed that
 * which country is missing from the db. Through api requests, a NOT_FOUND
 * http status will be sent back.
 * </p>
 */

package com.lucas.spring.model.expection;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * If a creation country is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which country is missing from the db.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class CountryNotFoundException extends RuntimeException {
  /**
  * Displaying an error message about
  * the missing creation country record from the db.
  *
  * @param countryCode The country code which is missing from the db.
  */
  public CountryNotFoundException(final String countryCode) {
    super(String.format("Creation Country is not found in the server! %s", countryCode));
  }
}
