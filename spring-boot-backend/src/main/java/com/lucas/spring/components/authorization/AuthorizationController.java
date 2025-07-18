package com.lucas.spring.components.authorization;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
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

  // TODO: email authorization should be here validated.

  /**
   * Authenticate the user.
   *
   * @param user The user who initiated the request.
   * @return Returns the list of plants stored in the server.
   */
  @CrossOrigin
  @PostMapping("/")
  public BaseResponse validate(@RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user) {
    return new BaseResponse();
  }
}
