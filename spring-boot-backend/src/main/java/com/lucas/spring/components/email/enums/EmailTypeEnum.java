package com.lucas.spring.components.email.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enums of the email types.
 */
@AllArgsConstructor
@Getter
public enum EmailTypeEnum {
  REPORT_EMAIL(1L),
  USER_CREATION_EMAIL(2L);
  private final Long id;
}
