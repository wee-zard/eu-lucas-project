package com.lucas.spring.commons.converters;

import com.lucas.spring.commons.enums.AuthorizationExceptionEnum;
import com.lucas.spring.commons.exception.AuthorizationException;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.services.HttpRequestService;
import com.lucas.spring.commons.utils.JsonUtil;
import com.lucas.spring.commons.utils.TokenUtil;
import com.lucas.spring.components.user.facade.UserFacade;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import org.json.simple.parser.ParseException;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link String} to {@link AuthenticatedUser}.
 */
@Component
@AllArgsConstructor
public class StringToAuthenticatedUserConverter implements Converter<String, AuthenticatedUser> {
  private final UserFacade userFacade;
  private final HttpRequestService httpRequestService;
  private static final String GOOGLE_OAUTH_VALIDATOR_URL = "https://oauth2.googleapis.com/tokeninfo?id_token=";

  /**
   * Validates the provided auth token, extracts the payload of the token,
   * based on the payload creates an {@link AuthenticatedUser} instance.
   *
   * @param authToken The GoogleOAuth token.
   * @return Returns an {@link AuthenticatedUser} instance if the token is valid, and the email
   *     stored inside the db properly.
   * @throws ParseException Throws an exception if the provided token is invalid.
   */
  private AuthenticatedUser fetchAuthUserByAuthToken(final String authToken) throws ParseException {
    final Map<String, String> payloadMap = JsonUtil.parseJsonStringToMap(
            httpRequestService.getResultOfRequest(GOOGLE_OAUTH_VALIDATOR_URL, authToken)
    );

    TokenUtil.validateTokenPayload(payloadMap);

    final Optional<AuthenticatedUser> authUser = userFacade.isEmailExists(payloadMap.get("email"));

    if (authUser.isEmpty()) {
      throw new AuthorizationException(AuthorizationExceptionEnum.PERMISSION_DENIED);
    }

    return authUser.get();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public AuthenticatedUser convert(final @NonNull String source) {
    try {
      return fetchAuthUserByAuthToken(TokenUtil.getTokenWithoutBearer(source));
    } catch (ParseException e) {
      throw new AuthorizationException(AuthorizationExceptionEnum.PERMISSION_DENIED);
    }
  }
}
