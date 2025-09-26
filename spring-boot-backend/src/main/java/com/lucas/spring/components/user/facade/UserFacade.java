package com.lucas.spring.components.user.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.user.model.request.UserCreationRequest;
import java.util.Optional;

/**
 * An interface service where we store methods
 * related to the user facade layer where other
 * services could be used together at the same time.
 */
public interface UserFacade {

  /**
   * Determines whether the provided email address exists in the db or not.
   *
   * @param emailAddress the user's gmail address.
   * @return Returns the authenticated use if exists.
   */
  Optional<AuthenticatedUser> isEmailExists(String emailAddress);

  /**
   * Adding a user's email address to the db.
   *
   * @param user the user who initiated the request.
   * @param request the request that was sent to the server.
   */
  void saveUser(AuthenticatedUser user, UserCreationRequest[] request);

  /**
   * Adding a user's email address to the db.
   *
   * @param emailAddress the user's gmail address.
   * @param roleId the id of the user role.
   */
  void saveUser(String emailAddress, long roleId);

  /**
   * Updates the user's states and set the missing properties of the user.
   *
   * @param userId The id of the user.
   * @param newStatusId The new id of the user's status.
   * @param imageBase64 The profile picture url of the user.
   * @param username The username.
   */
  void updateUserStatus(Long userId, Long newStatusId, String imageBase64, String username);

  /**
   * Deletes a user by their id.
   *
   * @param id The id of the user to delete.
   */
  void deleteUser(Long id, AuthenticatedUser user);

  /**
   * Activates a user.
   *
   * @param id The id of the user who needs to be activated.
   */
  void activateUser(Long id);
}
