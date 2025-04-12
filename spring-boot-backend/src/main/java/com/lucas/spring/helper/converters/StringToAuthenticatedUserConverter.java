package com.lucas.spring.helper.converters;

import com.lucas.spring.model.expection.PermissionDeniedException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.facade.UserFacade;
import com.lucas.spring.services.service.HttpRequestService;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.json.simple.JSONObject;
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

  /**
   * Validated the provided token, and returns the middle
   * section of the token that contains the object sent from the frontend.
   *
   * @param token The GoogleOAuth token.
   * @return Returns the token without the bearer section.
   */
  private String getTokenWithoutBearer(final String token) throws PermissionDeniedException {
    if (token == null) {
      throw new PermissionDeniedException();
    }
    String[] splitAuthToken = token.split(" ");
    if (splitAuthToken.length != 2) {
      throw new PermissionDeniedException();
    }
    /*
    System.out.printf("LOG: hello %s%n", authToken);
    var parts = authToken.split("\\.");
    for (int i=0; i< parts.length-1; i++) {
        var dec = Base64.getDecoder().decode(parts[i]);
        System.out.printf("LOG: token: %s%n", new String(dec));
    }
    */
    return splitAuthToken[1];
  }

  /**
   * Send the token to the Google OAuth token to validate the token. If the token
   * is valid, then return the Json parsed version of the request message, or else
   * throw an error.
   *
   * @param authToken the auth token that is stored in the header section of the http request.
   * @throws ParseException Throws an exception if the provided token is invalid.
   */
  private AuthenticatedUser fetchJsonMessageOfApiRequest(
          String authToken
  ) throws ParseException {
    // FIXME: Error is not handled in this method.
    final String googleAuthValidator = "https://oauth2.googleapis.com/tokeninfo?id_token=";
    final String jsonText = httpRequestService.getResultOfRequest(googleAuthValidator, authToken);
    return validateRequestMessage(httpRequestService.parseRequestResult(jsonText));
  }

  private AuthenticatedUser validateRequestMessage(JSONObject jsonObject) {
    if (jsonObject.get("error") != null) {
      // The provided token not a Google OAuth2 token.
      throw new PermissionDeniedException();
    }
    Optional<Boolean> emailVerified = Optional.of(Boolean.parseBoolean(
            (String) jsonObject.get("email_verified"))
    );
    if (Boolean.FALSE.equals(emailVerified.get())) {
      throw new PermissionDeniedException();
    }
    if (jsonObject.get("email") == null) {
      throw new PermissionDeniedException();
    }

    final Optional<AuthenticatedUser> authenticatedUser = userFacade.isEmailExists(
            (String) jsonObject.get("email")
    );
    if (authenticatedUser.isEmpty()) {
      throw new PermissionDeniedException();
    }
    return authenticatedUser.get();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public AuthenticatedUser convert(final String source) {
    try {
      return fetchJsonMessageOfApiRequest(getTokenWithoutBearer(source));
    } catch (ParseException e) {
      throw new PermissionDeniedException();
    }
  }
}
