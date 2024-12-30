package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.entity.UserEntity;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the User.
 */
@Service
public interface UserService {
  /**
   * Fetch a user by id.
   *
   * @param userId The user to fetch.
   * @return Gives back the entity of the user.
   */
  UserEntity getUserById(final Long userId);

  /**
   * Fetches the list of emails from the db in a hashed format.
   *
   * @return Returns the hashed format of the email addresses of the users.
   */
  ArrayList<String> getAllUsersEmail();

  /**
   * Save the provided email address.
   *
   * @param emailAddress The email address we want to save in the db.
   * @param statusEntity The status which the user will be given.
   */
  void saveEmailAddress(String emailAddress, StatusEntity statusEntity);

  /**
   * Save the provided email address.
   *
   * @param emailAddress The email address we want to save in the db.
   * @param statusEntity The status which the user will be given.
   * @param userName The name of the user.
   */
  void saveEmailAddressWithUserName(
          String emailAddress,
          StatusEntity statusEntity,
          String userName);
}
