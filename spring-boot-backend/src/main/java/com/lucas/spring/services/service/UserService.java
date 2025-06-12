package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.RoleEntity;
import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods related to the User.
 */
@Service
public interface UserService {
  /**
   * Fetch a user by id.
   *
   * @param id The user to fetch.
   * @return Gives back the entity of the user.
   */
  UserEntity getUserById(final Long id);

  /**
   * Fetches the list of emails from the db in a hashed format.
   *
   * @return Returns the hashed format of the email addresses of the users.
   */
  List<AuthenticatedUser> getAllUsersEmail();

  /**
   * Fetch the list of users from the server.
   *
   * @return Returns the users.
   */
  List<UserEntity> getUsers();

  /**
   * Save the user.
   *
   * @param email The email address we want to save in the db.
   * @param username The name of the user.
   * @param status The status which the user will be given.
   * @param role The role of the user
   */
  void saveUser(String email, String username, StatusEntity status, RoleEntity role);

  /**
   * Activate the provided user.
   *
   * @param id The id of the user.
   * @param username The full name of the user.
   * @param imageBase64 The profile picture url path to the resource.
   * @param status The new status of the user.
   */
  void activateUser(Long id, String username, String imageBase64, StatusEntity status);
}
