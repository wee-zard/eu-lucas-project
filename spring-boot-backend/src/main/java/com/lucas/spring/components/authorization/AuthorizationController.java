package com.lucas.spring.components.authorization;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the plant names.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/authorization")
public class AuthorizationController {

  /**
   * An endpoint to validate the provided email address to check,
   * if it is present in the server or not.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   */
  @CrossOrigin
  @PostMapping("/")
  public AuthenticatedUser validateToken(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return AuthenticatedUser.builder()
            .userId(user.getUserId())
            .roleId(user.getRoleId())
            .build();
  }

  /**
   * Get a new access token for the user.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   */
  @CrossOrigin
  @GetMapping("/access-token")
  public BaseResponse getNewAccessToken(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return null;
  }

  /**
   * Get a new refresh token for the user.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   */
  @CrossOrigin
  @GetMapping("/refresh-token")
  public BaseResponse getNewRefreshToken(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return null;
  }

  /**
   * A mechanism to revoke refresh tokens when a user logs out,
   * changes their password, or if a compromise is suspected.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   */
  @CrossOrigin
  @PostMapping("/revoke-refresh-token")
  public BaseResponse revokeRefreshToken(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return null;
  }
}
