package com.lucas.spring.components.user.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.validation.UserValidation;
import com.lucas.spring.components.email.service.EmailService;
import com.lucas.spring.components.encryption.enums.EncryptionFailedEnums;
import com.lucas.spring.components.encryption.exception.EncryptionFailedException;
import com.lucas.spring.components.encryption.service.EncryptionService;
import com.lucas.spring.components.role.enums.RoleEnum;
import com.lucas.spring.components.role.model.entity.RoleEntity;
import com.lucas.spring.components.role.service.RoleService;
import com.lucas.spring.components.status.enums.StatusEnum;
import com.lucas.spring.components.status.model.entity.StatusEntity;
import com.lucas.spring.components.status.service.StatusService;
import com.lucas.spring.components.user.enums.UserExceptionEnum;
import com.lucas.spring.components.user.exception.UserException;
import com.lucas.spring.components.user.facade.UserFacade;
import com.lucas.spring.components.user.model.entity.UserEntity;
import com.lucas.spring.components.user.model.request.UserCreationRequest;
import com.lucas.spring.components.user.service.UserService;
import jakarta.annotation.PostConstruct;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * The facade layer of the users where we encrypt the email address
 * of the users and save them in the server.
 */
@Service
@RequiredArgsConstructor
public class UserFacadeImpl implements UserFacade {
  private final EncryptionService encryptionService;
  private final UserService userService;
  private final StatusService statusService;
  private final RoleService roleService;
  private final UserValidation userValidation;
  private final EmailService emailService;
  @Value("${lucas.users.admins}") private String[] admins;

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<AuthenticatedUser> isEmailExists(String emailAddress) {
    return userService.getAllUsersEmail()
            .stream()
            .filter(user ->
                    Objects.equals(
                            encryptionService.decryptAndExtractEmail(user.getEmail()),
                            emailAddress)
            ).filter(user ->
                    user.getStatusId() == StatusEnum.PENDING.getStatusId()
                            || user.getStatusId() == StatusEnum.ACTIVATED.getStatusId())
            .findFirst();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void saveUser(final AuthenticatedUser user, final UserCreationRequest[] request) {
    userValidation.validateUserCreationForm(user, request);
    Arrays.stream(request).forEach(req -> {
      this.saveUser(req.getEmailAddress(), req.getRoleId());
      this.emailService.save(req, user);
    });
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

    userService.saveUser(encryptedString, emailAddress.split("@")[0], status, role);
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
   * {@inheritDoc}
   */
  @Override
  public void deleteUser(final Long id, final AuthenticatedUser user) {
    if (id == null) {
      throw new UserException(UserExceptionEnum.USER_ID_IS_NOT_SET);
    }

    if (Objects.equals(id, user.getUserId())) {
      throw new UserException(UserExceptionEnum.USER_CANNOT_DELETE_ITSELF, String.valueOf(id));
    }

    final UserEntity userEntity = userService.getUserById(id);
    userEntity.setDeletedAt(Instant.now());
    userEntity.setDeletedBy(user.getUserId());

    if (Objects.equals(userEntity.getStatus().getId(), StatusEnum.ACTIVATED.getStatusId())) {
      // Soft delete the user.
      userEntity.setStatus(statusService.getStatusById(StatusEnum.DELETED.getStatusId()));
      userService.saveUser(userEntity);
    } else if (Objects.equals(userEntity.getStatus().getId(), StatusEnum.PENDING.getStatusId())) {
      // Delete user permanently.
      userService.deleteUser(userEntity);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void activateUser(Long id) {
    final UserEntity userEntity = userService.getUserById(id);
    userEntity.setStatus(statusService.getStatusById(StatusEnum.ACTIVATED.getStatusId()));
    userService.saveUser(userEntity);
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
