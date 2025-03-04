package com.lucas.spring.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.response.BaseResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the plant names.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/authorization")
public class AuthorizationController {

  // TODO: email authorization should be here validated.

  /**
   * Fetches the list of plants.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of plants stored in the server.
   */
  @CrossOrigin
  @PostMapping("/")
  public BaseResponse refreshAuthTokenByRefreshToken(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
          @RequestParam String refreshToken
  ) {
    // TODO: Finish this endpoint
    return new BaseResponse();
  }
}
