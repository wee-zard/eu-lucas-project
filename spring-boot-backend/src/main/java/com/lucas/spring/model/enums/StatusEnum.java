package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumerable keys of the user statues.
 */
@Getter
@AllArgsConstructor
public enum StatusEnum {
  PENDING(1),
  BLOCKED(2),
  ACTIVATED(3),
  DELETED(4);
  private final long statusId;
}
