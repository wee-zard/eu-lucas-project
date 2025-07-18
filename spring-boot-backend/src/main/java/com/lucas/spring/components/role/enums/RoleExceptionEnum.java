package com.lucas.spring.components.role.enums;

import com.lucas.spring.components.role.exception.RoleException;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the error keys for the {@link RoleException}.
 */
@Getter
@AllArgsConstructor
public enum RoleExceptionEnum {
  NOT_FOUND("Role not found!");
  private final String message;
}
