package com.lucas.spring.components.image.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumerable keys of the operators that can be applied between filter components
 * to define their relationship between each other.
 */
@Getter
@AllArgsConstructor
public enum OperatorOption {
  EQUALS(1),
  DOES_NOT_EQUALS(2),
  CONTAINS(3),
  DOES_NOT_CONTAIN(4),
  STARTS_WITH(5),
  ENDS_WITH(6),
  IS_EMPTY(7), //TODO: ...
  IS_NOT_EMPTY(8), //TODO: ...
  IS_ANY_OF(9), //TODO: How to implement this?
  LESS(10),
  LESS_OR_EQUAL(11),
  GREATER(12),
  GREATER_OR_EQUAL(13),
  BOOLEAN_EQUAL(14),
  BOOLEAN_NOT_EQUAL(15);
  private final Integer id;
}
