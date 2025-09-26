package com.lucas.spring.commons.utils;

import com.lucas.spring.components.authorization.enums.AuthorizationExceptionEnum;
import com.lucas.spring.components.authorization.exception.AuthorizationException;
import java.util.Map;
import java.util.Optional;
import lombok.experimental.UtilityClass;

/**
 * Utility class for action, and methods for tokens.
 */
@UtilityClass
public class TokenUtil {

  /**
   * Validated the provided token, and returns the middle
   * section of the token that contains the object sent from the frontend.
   *
   * @param token The GoogleOAuth token.
   * @return Returns the token without the bearer section.
   */
  public String getTokenWithoutBearer(final String token) {
    if (token == null) {
      throw new AuthorizationException(AuthorizationExceptionEnum.PERMISSION_DENIED);
    }

    final String[] splitAuthToken = token.split(" ");

    if (splitAuthToken.length != 2) {
      throw new AuthorizationException(AuthorizationExceptionEnum.PERMISSION_DENIED);
    }

    return splitAuthToken[1];
  }

  /**
   * Validates the provided payload.
   *
   * @param payloadMap The payload to validate.
   */
  public void validateTokenPayload(final Map<String, String> payloadMap) {
    final boolean isInvalid = payloadMap.get("error") != null
            || payloadMap.get("email") == null;

    if (isInvalid) {
      throw new AuthorizationException(AuthorizationExceptionEnum.PERMISSION_DENIED);
    }

    final Optional<Boolean> emailVerified = Optional.of(Boolean.parseBoolean(
            payloadMap.get("email_verified"))
    );

    if (!emailVerified.get()) {
      throw new AuthorizationException(AuthorizationExceptionEnum.PERMISSION_DENIED);
    }
  }
}
