package com.lucas.spring.helper.utils;

import lombok.experimental.UtilityClass;

/**
 * Parse the provided values and turn them into a new type.
 */
@UtilityClass
public class FormatParseUtil {
  /**
   * Parse the provided string into number.
   *
   * @param text The text to parse.
   * @return Return the number format of the text param
   * @throws NumberFormatException thrown upon error.
   */
  public Number parseStringIntoNumber(final String text) throws NumberFormatException {
    try {
      return Integer.parseInt(text);
    } catch (NumberFormatException exception) {
      throw new RuntimeException("Error while parsing text to number");
    }
  }
}
