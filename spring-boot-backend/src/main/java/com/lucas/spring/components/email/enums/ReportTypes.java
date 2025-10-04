package com.lucas.spring.components.email.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enums of the reports that can be provided by the users
 * from the Report page.
 */
@AllArgsConstructor
@Getter
public enum ReportTypes {
  /**
   * The user is reporting a bug.
   */
  BUG,
  /**
   * The user is requesting an implementation of a new feature.
   */
  REQUEST_FEATURE,
}
