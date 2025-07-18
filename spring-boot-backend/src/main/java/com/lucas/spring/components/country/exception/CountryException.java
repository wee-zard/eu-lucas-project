/**
 * This module is about throwing a Country that is not exist in the db.
 *
 * <p>With the name of the country, the user could be informed that
 * which country is missing from the db. Through api requests, a NOT_FOUND
 * http status will be sent back.</p>
 */

package com.lucas.spring.components.country.exception;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.components.country.enums.CountryExceptionEnum;

/**
 * If a creation country is not present in the server, then
 * this error message will be thrown, so the user could be
 * informed that which country is missing from the db.
 */
public class CountryException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public CountryException(final CountryExceptionEnum message, final Object... param) {
    super(message, param);
  }
}
