package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the error keys for the {@link com.lucas.spring.model.expection.RoleException}.
 */
@Getter
@AllArgsConstructor
public enum RoleExceptionEnum {
  NOT_FOUND("Role not found!");
  private final String message;
}
