package com.lucas.spring.components.user;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.commons.utils.ImageManipulationUtil;
import com.lucas.spring.components.user.facade.UserFacade;
import com.lucas.spring.components.user.model.dto.UserDto;
import com.lucas.spring.components.user.model.request.UserActivateDeletedRequest;
import com.lucas.spring.components.user.model.request.UserCreationRequest;
import com.lucas.spring.components.user.model.request.UserStatusChangeRequest;
import com.lucas.spring.components.user.model.response.UserToolpadSession;
import com.lucas.spring.components.user.service.UserService;
import jakarta.validation.Valid;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
  private final CustomConversionService conversionService;

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
      @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
      @RequestBody @Valid final UserCreationRequest[] request
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
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
          @RequestBody final UserStatusChangeRequest req
  ) {
    final String imageBase64 = ImageManipulationUtil.scaleDownImage(req.getImageUrl());
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
  public UserToolpadSession getSession(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user
  ) {
    return conversionService.convert(
            userService.getUserById(user.getUserId()),
            UserToolpadSession.class
    );
  }

  /**
   * An endpoint to fetch the users and their information from the sever.
   *
   * @param user The authenticated user who initiated the request.
   * @return Returns a list of user dto that contains the user's data.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<UserDto> getUsers(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user
  ) {
    return conversionService.convert(userService.getUsers(), UserDto.class);
  }

  /**
   * Change the user's status based on the provided request.
   *
   * @param user The authenticated user who initiated someone's email to be added to the server.
   * @param request The id of the user to activate
   */
  @CrossOrigin
  @PostMapping("/activate-deleted")
  public BaseResponse activateDeletedUser(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
          @RequestBody final UserActivateDeletedRequest request
  ) {
    userFacade.activateUser(request.getId());
    return new BaseResponse();
  }

  /**
   * Deletes a user from the system.
   *
   * @param user The authenticated user who initiated the request.
   * @param id The id of the user who should be deleted.
   * @return Returns a {@link BaseResponse} if the deletion of the user is finished successfully.
   */
  @CrossOrigin
  @DeleteMapping("/")
  public BaseResponse deleteUser(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
          @RequestParam final String id
  ) {
    userFacade.deleteUser(FormatParseUtil.parseToLong(id), user);
    return new BaseResponse();
  }
}
