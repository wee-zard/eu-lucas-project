package com.lucas.spring.commons.utils;

import com.lucas.spring.commons.enums.InputFormatExceptionEnum;
import com.lucas.spring.commons.exception.InputFormatException;
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
  public Integer parseToInteger(final String text) {
    try {
      return Integer.parseInt(text);
    } catch (NumberFormatException exception) {
      throw new InputFormatException(
              InputFormatExceptionEnum.CASTING_STRING_TO_NUMBER_IS_INVALID,
              text);
    }
  }

  public Integer parseToInteger(final Long data) {
    try {
      return Integer.parseInt(String.valueOf(data));
    } catch (NumberFormatException exception) {
      throw new InputFormatException(
              InputFormatExceptionEnum.CASTING_LONG_TO_NUMBER_IS_INVALID,
              data);
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
   * @param data The text to parse.
   * @return Returns the long number format of the text param.
   */
  public Long parseToLong(final String data) {
    try {
      return Long.parseLong(data);
    } catch (NumberFormatException exception) {
      throw new InputFormatException(
              InputFormatExceptionEnum.CASTING_STRING_TO_LONG_IS_INVALID,
              data);
    }
  }

  /**
   * Parses the provided number into a long number.
   *
   * <p><strong>Example I.:</strong>
   *
   * <p>Input: 23 (type "Integer")</p>
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
   * @param data The number to parse.
   * @return Returns the long number format of the provided input.
   */
  public Long parseToLong(final Integer data) {
    try {
      return Long.valueOf(data);
    } catch (NumberFormatException exception) {
      throw new InputFormatException(
              InputFormatExceptionEnum.CASTING_INTEGER_TO_LONG_IS_INVALID,
              data);
    }
  }
}
