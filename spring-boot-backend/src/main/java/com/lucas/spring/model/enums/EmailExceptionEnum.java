package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Stores the possible error messages that could happen during the
 * send out of the emails.
 */
@Getter
@AllArgsConstructor
public enum EmailExceptionEnum {
  USER_CREATION_EMAIL("Hiba történt a létrehozott felhasználó számára kiküldött email során!"),
  REPORT_EMAIL("Hiba történt a Report email kiküldése során!");
  /**
   * Displays the error message of the exception.
   */
  private final String errorMessage;
}
