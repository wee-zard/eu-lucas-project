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
   * Parses the provided string into a number.
   *
   * <p><strong>Example I.:</strong>
   *
   * <p>Input: "23" (type "String")</p>
   *
   * <p>Output: 23 (type "Number")</p>
   * </p><br>
   *
   * <p><strong>Example II.:</strong>
   *
   * <p>Input: "xml" (type "String")</p>
   *
   * <p>Output: {@link NumberFormatException}</p>
   * </p><br>
   *
   * @param text The text to parse.
   * @return Returns the number format of the text param.
   */
  public Integer parseStringIntoNumber(final String text) {
    try {
      return Integer.parseInt(text);
    } catch (NumberFormatException exception) {
      throw new InputFormatException(InputFormatErrors.CASTING_STRING_TO_NUMBER_IS_INVALID, text);
    }
  }

  /**
   * Parses the provided string into a long number.
   *
   * <p><strong>Example I.:</strong>
   *
   * <p>Input: "23" (type "String")</p>
   *
   * <p>Output: 23L (type "Long")</p>
   * </p><br>
   *
   * <p><strong>Example II.:</strong>
   *
   * <p>Input: "xml" (type "String")</p>
   *
   * <p>Output: {@link NumberFormatException}</p>
   * </p><br>
   *
   * @param text The text to parse.
   * @return Returns the long number format of the text param.
   */
  public Long parseStringToLong(final String text) {
    try {
      return Long.parseLong(text);
    } catch (NumberFormatException exception) {
      throw new InputFormatException(InputFormatErrors.CASTING_STRING_TO_LONG_IS_INVALID, text);
    }
  }
}
