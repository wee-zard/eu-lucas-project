package com.lucas.spring.components.email.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enums of the reports email keys.
 */
@AllArgsConstructor
@Getter
public enum EmailReportKeyEnum {
  NAME("name"),
  USERNAME("username"),
  TYPE("type"),
  TITLE("title"),
  MESSAGE("message"),
  USER_ID("userid");
  private final String name;
}