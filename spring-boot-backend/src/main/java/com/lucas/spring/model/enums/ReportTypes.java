package com.lucas.spring.model.enums;

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
  BUG("Bug"),
  /**
   * The user is requesting an implementation of a new feature.
   */
  REQUEST_FEATURE("Request Feature");
  private final String name;
}
