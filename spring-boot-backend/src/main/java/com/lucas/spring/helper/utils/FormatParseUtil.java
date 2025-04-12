package com.lucas.spring.helper.utils;

import com.lucas.spring.model.enums.InputFormatErrors;
import com.lucas.spring.model.expection.InputFormatException;
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
  public Integer parseStringIntoNumber(final String text) throws NumberFormatException {
    try {
      return Integer.parseInt(text);
    } catch (NumberFormatException exception) {
      throw new InputFormatException(InputFormatErrors.CASTING_STRING_TO_NUMBER_IS_INVALID, text);
    }
  }
}
