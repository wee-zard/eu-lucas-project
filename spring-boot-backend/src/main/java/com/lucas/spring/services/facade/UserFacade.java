package com.lucas.spring.services.facade;

import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the user facade layer where other
 * services could be used together at the same time.
 */
@Service
public interface UserFacade {

  /**
   * Determines whether the provided email address exists in the
   * db or not.
   *
   * @param emailAddress the user's gmail address.
   * @return Returns true, if the provided email exists in the db,
   *     false otherwise.
   */
  boolean isEmailExists(String emailAddress);

  /**
   * Adding a user's email address to the db.
   *
   * @param emailAddress the user's gmail address.
   */
  void saveEmailAddress(String emailAddress);
}
