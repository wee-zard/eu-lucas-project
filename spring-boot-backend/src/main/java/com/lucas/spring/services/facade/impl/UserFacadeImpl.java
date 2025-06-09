package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.RoleEntity;
import com.lucas.spring.model.entity.StatusEntity;
import com.lucas.spring.model.enums.EncryptionFailedEnums;
import com.lucas.spring.model.enums.RoleEnum;
import com.lucas.spring.model.enums.StatusEnum;
import com.lucas.spring.model.expection.EncryptionFailedException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.services.facade.UserFacade;
import com.lucas.spring.services.service.EncryptionService;
import com.lucas.spring.services.service.RoleService;
import com.lucas.spring.services.service.StatusService;
import com.lucas.spring.services.service.UserService;
import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * The facade layer of the users where we encrypt the email address
 * of the users and save them in the server.
 */
@Service
public class UserFacadeImpl implements UserFacade {
  private final EncryptionService encryptionService;
  private final UserService userService;
  private final StatusService statusService;
  private final RoleService roleService;

  @Value("${lucas.users.admins}")
  private String[] admins;

  UserFacadeImpl(
          final EncryptionService encryptionService,
          final UserService userService,
          final StatusService statusService,
          final RoleService roleService
  ) {
    this.encryptionService = encryptionService;
    this.userService = userService;
    this.statusService = statusService;
    this.roleService = roleService;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<AuthenticatedUser> isEmailExists(String emailAddress) {
    return userService.getAllUsersEmail()
            .stream()
            .filter(user ->
                    encryptionService.decryptAndExtractEmail(user.getEmail()).equals(emailAddress)
            ).findFirst();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void saveUser(final String emailAddress, final long roleId) {
    final StatusEntity status = statusService.getStatusById(StatusEnum.PENDING.getStatusId());
    final RoleEntity role = roleService.getById(roleId);
    final String encryptedString = encryptionService.encrypt(emailAddress);

    if (encryptedString.isEmpty()) {
      throw new EncryptionFailedException(EncryptionFailedEnums.ENCRYPTION_STRING_IS_EMPTY);
    }

    userService.saveUser(encryptedString, status, role);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void updateUserStatus(
          final Long id,
          final Long newStatusId,
          final String imageBase64,
          final String username) {
    userService.activateUser(id, username, imageBase64, statusService.getStatusById(newStatusId));
  }

  /**
   * Init the user table with a default user who could get
   * access to the application.
   */
  @PostConstruct
  private void defaultUserAddition() {
    final List<AuthenticatedUser> userEmails = userService.getAllUsersEmail();

    if (!userEmails.isEmpty()) {
      return;
    }

    Arrays.stream(admins).forEach(admin -> this.saveUser(admin, RoleEnum.ADMIN.getRoleId()));
  }
}
