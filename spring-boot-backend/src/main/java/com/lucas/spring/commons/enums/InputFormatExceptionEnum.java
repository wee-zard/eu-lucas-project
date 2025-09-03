package com.lucas.spring.commons.enums;

/**
 * Hold the error messages that could occur when a provided input type
 * cannot be cast to another type.
 */
public enum InputFormatExceptionEnum {
  CASTING_INTEGER_TO_LONG_IS_INVALID,
  CASTING_STRING_TO_LONG_IS_INVALID,
  CASTING_STRING_TO_NUMBER_IS_INVALID,
  CASTING_LONG_TO_NUMBER_IS_INVALID,
}
