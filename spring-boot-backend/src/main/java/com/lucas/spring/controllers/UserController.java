package com.lucas.spring.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.EmailRequest;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.services.facade.UserFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
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
public class UserController {
  private final UserFacade userFacade;

  /**
   * An endpoint to validate the provided email address to check,
   * if it is present in the server or not.
   *
   * @param authenticatedUser The authenticated user who initiated someone's email
   *     to be added to the server.
   */
  @CrossOrigin
  @PostMapping("/validate-email")
  public BaseResponse postValidateEmailAddress(
      @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return new BaseResponse();
  }

  /**
   * An endpoint to upload email addresses to the db by another users.
   *
   * @param authenticatedUser The authenticated user who initiated someone's email
   *     to be added to the server.
   * @param emailRequest The email address to add to the server.
   *     It is different from the authenticator's email.
   */
  @CrossOrigin
  @PostMapping("/save-email")
  public void postEmailAddressToDb(
      @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
      @RequestBody final EmailRequest emailRequest
  ) {
    userFacade.saveEmailAddress(emailRequest.getEmailAddress());
  }
}
