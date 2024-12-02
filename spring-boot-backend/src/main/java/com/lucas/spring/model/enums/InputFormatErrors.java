package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Hold the error messages that could occur when a provided input type
 * cannot be cast to another type.
 */
@Getter
@AllArgsConstructor
public enum InputFormatErrors {
  CASTING_STRING_TO_NUMBER_IS_INVALID("casting-string-to-number-is-invalid");
  private final String errorMessage;
}
