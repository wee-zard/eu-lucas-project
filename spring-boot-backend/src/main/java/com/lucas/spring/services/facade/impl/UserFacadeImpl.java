package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.enums.EncryptionFailedEnums;
import com.lucas.spring.model.enums.StatusEnum;
import com.lucas.spring.model.expection.EncryptionFailedException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.facade.UserFacade;
import com.lucas.spring.services.service.EncryptionService;
import com.lucas.spring.services.service.StatusService;
import com.lucas.spring.services.service.UserService;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Optional;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * The facade layer of the users where we encrypt the email address
 * of the users and save them in the server.
 */
@AllArgsConstructor
@Service
public class UserFacadeImpl implements UserFacade {
  private EncryptionService encryptionService;
  private UserService userService;
  private StatusService statusService;
  private static final String ADMIN = "udvattila99@gmail.com";

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<AuthenticatedUser> isEmailExists(String emailAddress) {
    return userService.getAllUsersEmail()
            .stream()
            .filter(user -> {
              final String userNonHashedEmail = encryptionService.decrypt(user.getEmail());
              return userNonHashedEmail != null
                      && userNonHashedEmail.split(" ")[0].equals(emailAddress);
            }).findFirst();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void saveEmailAddress(String emailAddress) {
    StatusEntity statusEntity = statusService.getStatusById(StatusEnum.PENDING.getStatusId());
    String encryptedString = encryptionService.encrypt(emailAddress);
    if (encryptedString != null) {
      userService.saveEmailAddress(encryptedString, statusEntity);
    } else {
      throw new EncryptionFailedException(EncryptionFailedEnums.ENCRYPTION_STRING_IS_EMPTY);
    }
  }

  /**
   * Init the user table with a default user who could get
   * access to the application.
   */
  @PostConstruct
  private void defaultUserAddition() {
    ArrayList<AuthenticatedUser> userEmails = userService.getAllUsersEmail();
    if (userEmails.isEmpty()) {
      saveEmailAddress(ADMIN);
    }
  }
}
