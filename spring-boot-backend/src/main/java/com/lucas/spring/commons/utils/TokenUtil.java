package com.lucas.spring.commons.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.lucas.spring.commons.enums.AuthorizationExceptionEnum;
import com.lucas.spring.commons.exception.AuthorizationException;
import java.util.Base64;
import java.util.Map;
import java.util.Optional;
import lombok.experimental.UtilityClass;
import org.json.simple.parser.ParseException;

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
   * Decodes the provided auth token into a Decoded JWT.
   *
   * @param authToken The auth token to decode.
   * @return Returns a {@link DecodedJWT} instance that contains
   *     the information of the token decoded token.
   * @throws JWTDecodeException Throws an exception if the token was undecodable.
   */
  public DecodedJWT decodeToken(final String authToken) throws JWTDecodeException {
    return JWT.decode(authToken.contains("Bearer ") ? getTokenWithoutBearer(authToken) : authToken);
  }

  /**
   * Extracts the payload from the provided decoded jwt token instance.
   *
   * @param decodedJwt The jwt token to extract.
   * @return Returns a map that contains the content of the payload from the decoded jwt token.
   */
  public Map<String, String> extractPayload(final DecodedJWT decodedJwt) throws ParseException {
    return JsonUtil.parseJsonStringToMap(Base64.getUrlDecoder().decode(decodedJwt.getPayload()));
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
