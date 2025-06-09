package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the error keys for the {@link com.lucas.spring.model.expection.UserException}.
 */
@Getter
@AllArgsConstructor
public enum UserExceptionEnum {
  NOT_FOUND("User not found!");
  private final String message;
}
