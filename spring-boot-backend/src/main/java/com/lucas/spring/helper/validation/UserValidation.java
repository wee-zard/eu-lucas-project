package com.lucas.spring.helper.validation;

import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.enums.UserExceptionEnum;
import com.lucas.spring.model.expection.UserException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.UserCreationRequest;
import com.lucas.spring.services.service.EncryptionService;
import com.lucas.spring.services.service.UserService;
import java.util.Arrays;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * Validates the provided requests.
 */
@Component
@AllArgsConstructor
public class UserValidation {
  private final UserService userService;
  private final EncryptionService encryptionService;

  public void validateUserCreationForm(final AuthenticatedUser user, final UserCreationRequest[] req) {
    Arrays.stream(req).forEach(request -> {
      final String email = request.getEmailAddress();

      //if (user.getRoleId() > request.getRoleId()) {
        // TODO: Uncomment the below line after the permissions are implemented on the frontend.
        //throw new UserException(UserExceptionEnum.UNAUTHORIZED_ROLE_SET_TO_USER, email);
      //}

      if (!isEmailNotDuplicated(request.getEmailAddress())) {
        throw new UserException(UserExceptionEnum.EMAIL_ADDRESS_IS_ALREADY_TAKEN, email);
      }

      if (!email.endsWith("@gmail.com")) {
        throw new UserException(UserExceptionEnum.EMAIL_POSTFIX_IS_NOT_GMAIL, email);
      }
    });
  }

  /**
   * Checks whether the provided email is free to use, and not any
   * duplicates from the db, or not a deleted/blocked user's email.
   *
   * @param email The email to check.
   * @return Returns true if the email is free to use.
   */
  private boolean isEmailNotDuplicated(final String email) {
    final List<String> hashedEmails = userService.getUsers().stream()
            .map(UserEntity::getEmailAddress)
            .toList();

    return hashedEmails.stream()
            .noneMatch(hashed -> encryptionService.decryptAndExtractEmail(hashed).equals(email));
  }
}
