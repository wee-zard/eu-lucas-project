package com.lucas.spring.commons.utils;

import java.time.Instant;
import java.time.format.DateTimeParseException;
import java.util.Date;
import lombok.experimental.UtilityClass;

/**
 * Utility class for date, date time, unix time and other time related
 * functionalities for common use.
 */
@UtilityClass
public class DateTimeUtil {
  /**
   * Checks whether the provided date is expired. A date is expired if the checked date's unix time
   * is greater than the current date's unix time.
   *
   * @param dateToCheck The date to check.
   * @return Returns true if the date is expired.
   */
  public boolean isExpired(final Date dateToCheck) {
    return dateToCheck.before(new Date());
  }

  /**
   * Based on the provided iso string, convert it into an instant value.
   *
   * @param isoString The iso string to convert.
   * @return Returns the instant value of the provided iso string.
   */
  public Instant toInstant(final String isoString) {
    try {
      return Instant.parse(isoString);
    } catch (DateTimeParseException exception) {
      // TODO: Throw better exception here
      throw new RuntimeException("Error while parsing date:" + isoString);
    }
  }
}
