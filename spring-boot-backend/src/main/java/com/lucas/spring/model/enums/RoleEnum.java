package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumerable keys of the user roles.
 */
@Getter
@AllArgsConstructor
public enum RoleEnum {
  ADMIN(1),
  PROFESSOR(2),
  STUDENT(3);
  private final int roleId;
}