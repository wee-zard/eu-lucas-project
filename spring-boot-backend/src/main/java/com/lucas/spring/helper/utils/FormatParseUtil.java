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
