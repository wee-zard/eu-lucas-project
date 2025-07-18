package com.lucas.spring.components.user.enums;

import com.lucas.spring.components.user.exception.UserException;

/**
 * Defines the error keys for the {@link UserException}.
 */
public enum UserExceptionEnum {
  USER_ID_IS_NOT_SET,
  USER_CANNOT_DELETE_ITSELF,
  USER_EMAIL_POSTFIX_IS_NOT_GMAIL,
  USER_UNAUTHORIZED_ROLE_SET_TO_USER,
  USER_EMAIL_ADDRESS_IS_ALREADY_TAKEN,
  USER_NOT_FOUND,
}
