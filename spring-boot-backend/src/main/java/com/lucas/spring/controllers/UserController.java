package com.lucas.spring.controllers;

import com.lucas.spring.helper.helper.ConversionHelper;
import com.lucas.spring.model.dto.UserDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.EmailRequest;
import com.lucas.spring.model.request.UserStatusChangeRequest;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.model.response.UserToolpadSession;
import com.lucas.spring.services.facade.ImageFetcherFacade;
import com.lucas.spring.services.facade.UserFacade;
import com.lucas.spring.services.service.UserService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
  private final UserService userService;
  private final ImageFetcherFacade imageFetcherFacade;
  private final ConversionHelper conversionHelper;

  /**
   * An endpoint to validate the provided email address to check,
   * if it is present in the server or not.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   */
  @CrossOrigin
  @PostMapping("/validate-email")
  public AuthenticatedUser validate(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return AuthenticatedUser.builder()
            .userId(user.getUserId())
            .roleId(user.getRoleId())
            .build();
  }

  /**
   * An endpoint to upload email addresses to the db by another users.
   *
   * @param user The authenticated user who initiated someone's email
   *     to be added to the server.
   * @param request The email address to add to the server.
   *     It is different from the authenticator's email.
   */
  @CrossOrigin
  @PostMapping("/save-email")
  public BaseResponse postEmailAddressToDb(
      @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
      @RequestBody @Valid final EmailRequest[] request
  ) {
    userFacade.saveUser(user, request);
    return new BaseResponse();
  }

  /**
   * Change the user's status based on the provided request.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   * @param req The request that holds the user status change information.
   */
  @CrossOrigin
  @PostMapping("/activate")
  public BaseResponse activateUser(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody final UserStatusChangeRequest req
  ) {
    final String imageBase64 = imageFetcherFacade.scaleDownImage(req.getImageUrl());
    userFacade.updateUserStatus(user.getUserId(), req.getStatus(), imageBase64, req.getUsername());
    return new BaseResponse();
  }

  /**
   * Get the session of the currently browsing user.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   * @return Returns the toolpad session.
   */
  @CrossOrigin
  @GetMapping("/toolpad-session")
  public UserToolpadSession getToolpadSession(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user
  ) {
    return conversionHelper.convertSingleEntityToSingleDto(
            userService.getUserById(user.getUserId()),
            UserToolpadSession.class
    );
  }

  /**
   * An endpoint to fetch the users and their information from the sever.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   * @return Returns a list of user dto that contains the user's data.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<UserDto> getUsers(@RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user) {
    return conversionHelper.convertEntityListToDtoList(userService.getUsers(), UserDto.class);
  }
}
