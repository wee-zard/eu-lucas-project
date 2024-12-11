package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.enums.StatusEnum;
import com.lucas.spring.model.expection.EncryptionFailedException;
import com.lucas.spring.services.facade.UserFacade;
import com.lucas.spring.services.service.EncryptionService;
import com.lucas.spring.services.service.StatusService;
import com.lucas.spring.services.service.UserService;
import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.stream.Collectors;
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
  public boolean isEmailRegisteredInDB(String emailAddress) {
    return userService.getAllUsersEmail()
        .stream()
        .map(hashedEmail -> encryptionService.decrypt(hashedEmail))
        .collect(Collectors.toCollection(ArrayList::new)
        ).stream()
        .anyMatch(nonHashedEmail -> nonHashedEmail != null
                && nonHashedEmail.split(" ")[0].equals(emailAddress));
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
      throw new EncryptionFailedException();
    }
  }

  /**
   * Init the user table with a default user who could get
   * access to the application.
   */
  @PostConstruct
  private void defaultUserAddition() {
    ArrayList<String> userEmails = userService.getAllUsersEmail();
    if (userEmails.isEmpty()) {
      saveEmailAddress(ADMIN);
    }
  }
}
