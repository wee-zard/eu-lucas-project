package com.lucas.spring.api.controllers;

import com.lucas.spring.model.expection.LoginException;
import com.lucas.spring.model.expection.PermissionDeniedException;
import com.lucas.spring.model.request.EmailRequest;
import com.lucas.spring.services.facade.UserFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the user.
 */
@RestController
@RequestMapping(path = "api/user")
@AllArgsConstructor
public final class UserController {
  private final UserFacade userFacade;

  /**
   * An endpoint to validate the provided email address to check,
   * if it is present in the server or not. If not, then throw
   * a {@link LoginException}.
   *
   * @param emailRequest The email address to add to the server.
   *     It is different from the authenticator's email.
   */
  @PostMapping("/validate-email")
  public void postValidateEmailAddress(@RequestBody final EmailRequest emailRequest) {
    if (!userFacade.isEmailRegisteredInDB(emailRequest.getEmailAddress())) {
      throw new LoginException();
    }
  }

  /**
   * An endpoint to upload email addresses to the db by another users.
   * <p>
   * If the authentication token is not present in the header,
   * then throw {@link PermissionDeniedException}.
   * </p>
   * <p>
   * If the email address of the requester is not present in the server,
   * then throw {@link PermissionDeniedException} as well.
   * </p>
   *
   * @param authentication The authenticated user who initiated someone's email
   *     to be added to the server. This should be a Google OAuth2 token!
   * @param emailRequest The email address to add to the server.
   *     It is different from the authenticator's email.
   */
  @PostMapping("/save-email")
  public void postEmailAddressToDb(
      @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication,
      @RequestBody final EmailRequest emailRequest
  ) {
    if (authentication == null) {
      throw new PermissionDeniedException();
    }
    /*
     * TODO: Extra step: Validate, if the Authentication is a valid Google OAuth2 token,
     *  and the email address from the token is present in the system or not.
     */
    final boolean isEmailRegistered = userFacade.isEmailRegisteredInDB(authentication);
    if (!isEmailRegistered) {
      throw new PermissionDeniedException();
    }
    userFacade.saveEmailAddress(emailRequest.getEmailAddress());
  }
}
