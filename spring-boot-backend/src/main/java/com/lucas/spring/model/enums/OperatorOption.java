package com.lucas.spring.model.enums;

/**
 * Enumerable keys of the operators that can be applied between filter components
 * to define their relationship between each other.
 */
public enum OperatorOption {
  EQUALS,
  DOES_NOT_EQUALS,
  CONTAINS,
  DOES_NOT_CONTAIN,
  STARTS_WITH,
  ENDS_WITH,
  IS_EMPTY, //TODO: ...
  IS_NOT_EMPTY, //TODO: ...
  IS_ANY_OF, //TODO: How to implement this?
  LESS,
  LESS_OR_EQUAL,
  GREATER,
  GREATER_OR_EQUAL

}
