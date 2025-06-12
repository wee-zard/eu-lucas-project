package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the error keys for the {@link com.lucas.spring.model.expection.UserException}.
 */
@Getter
@AllArgsConstructor
public enum UserExceptionEnum {
  EMAIL_POSTFIX_IS_NOT_GMAIL("Nem egy gmail email cím kertül megadásra!"),
  UNAUTHORIZED_ROLE_SET_TO_USER("Nincs jogosultságod egy ilyen szerepkörű felhasználót létrehozni!"),
  EMAIL_ADDRESS_IS_ALREADY_TAKEN("Az email cím már használatban van!"),
  NOT_FOUND("User not found!");
  private final String message;
}
