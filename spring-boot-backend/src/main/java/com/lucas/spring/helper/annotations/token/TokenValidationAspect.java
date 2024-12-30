package com.lucas.spring.helper.annotations.token;

import com.lucas.spring.model.expection.PermissionDeniedException;
import com.lucas.spring.services.facade.UserFacade;
import java.io.IOException;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.RestTemplate;

/**
 * Provides a custom annotation that will check if in the
 * authorization of the user is valid, or else throws a
 * {@link PermissionDeniedException} message back to the user.
 */
@Aspect
@Component
@AllArgsConstructor
public class TokenValidationAspect {
  private final UserFacade userFacade;

  /**
   * Send the token to the Google OAuth token to validate the token. If the token
   * is valid, then return the Json parsed version of the request message, or else
   * throw an error.
   *
   * @param authToken the auth token that is stored in the header section of the http request.
   * @throws ParseException Throws an exception if the provided token is invalid.
   */
  private void fetchJsonMessageOfApiRequest(
          String authToken
  ) throws ParseException {
    RestTemplate restTemplate = new RestTemplate();
    restTemplate.setErrorHandler(new DefaultResponseErrorHandler() {
      @Override
      public void handleError(ClientHttpResponse response) throws IOException {}
    });
    String authenticatorUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=";
    String jsonString = restTemplate.getForObject(
            String.format("%s%s", authenticatorUrl, authToken),
            String.class
    );
    JSONParser parser = new JSONParser();
    JSONObject jsonObject = (JSONObject) parser.parse(jsonString);
    validateRequestMessage(jsonObject);
  }

  private void validateRequestMessage(JSONObject jsonObject) {
    if (jsonObject.get("error") != null) {
      // Is the provided token not a Google OAuth2 token.
      throw new PermissionDeniedException();
    }
    Optional<Boolean> emailVerified = Optional.of(Boolean.parseBoolean(
            (String) jsonObject.get("email_verified"))
    );
    if (!emailVerified.get()) {
      throw new PermissionDeniedException();
    }
    if (jsonObject.get("email") == null) {
      throw new PermissionDeniedException();
    }

    final boolean isEmailRegistered = userFacade.isEmailExists(
            (String) jsonObject.get("email")
    );
    if (!isEmailRegistered) {
      throw new PermissionDeniedException();
    }
  }

  /**
   * Defines the custom annotation that can be applied to
   * the controller.
   *
   * @param joinPoint The joint points.
   */
  @Around("@annotation(TokenValidation)")
  public final Object tokenValidation(
          final ProceedingJoinPoint joinPoint
  ) throws Throwable {
    if (joinPoint == null || joinPoint.getArgs().length == 0) {
      throw new PermissionDeniedException();
    }
    String token = (String) joinPoint.getArgs()[0];
    if (token == null) {
      throw new PermissionDeniedException();
    }
    String[] splitAuthToken = token.split(" ");
    if (splitAuthToken.length != 2) {
      throw new PermissionDeniedException();
    }
    String authToken = splitAuthToken[1];
    fetchJsonMessageOfApiRequest(authToken);

    /*
    System.out.printf("LOG: hello %s%n", authToken);
    var parts = authToken.split("\\.");
    for (int i=0; i< parts.length-1; i++) {
        var dec = Base64.getDecoder().decode(parts[i]);
        System.out.printf("LOG: token: %s%n", new String(dec));
    }
    */

    return joinPoint.proceed();
  }
}
