package com.lucas.spring.components.email.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enums of the reports email keys.
 */
@AllArgsConstructor
@Getter
public enum EmailUserCreationKeyEnum {
  INVITED_USER_EMAIL("invited_user_email"),
  INVITER_USER("inviter_user");
  private final String name;
}