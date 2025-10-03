package com.lucas.spring.components.report.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enums of the report statuses.
 */
@AllArgsConstructor
@Getter
public enum ReportStatusEnum {
  TODO(1L),
  PENDING(2L),
  IN_PROGRESS(3L),
  DONE(4L),
  DENIED(5L);
  private final Long id;
}
