package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumerable keys of the operators that can be applied between filter components
 * to define their relationship between each other.
 */
@Getter
@AllArgsConstructor
public enum OperatorOption {
  EQUALS("= (egyenlő)"),
  DOES_NOT_EQUALS("!= (nem egyenlő)");
  private final String operatorName;
}
