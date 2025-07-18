package com.lucas.spring.components.user.converters;

import com.lucas.spring.components.encryption.service.EncryptionService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import com.lucas.spring.components.user.model.response.UserToolpadSession;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link UserEntity} to {@link UserToolpadSession}.
 */
@Component
@AllArgsConstructor
public class UserEntityToUserToolpadSessionConverter
        implements Converter<UserEntity, UserToolpadSession> {
  private EncryptionService encryptionService;

  /**
   * {@inheritDoc}
   */
  @Override
  public UserToolpadSession convert(final UserEntity source) {
    return UserToolpadSession.builder()
            .name(source.getUserName())
            .email(encryptionService.decryptAndExtractEmail(source.getEmailAddress()))
            .image(source.getProfilePictureBase64())
            .build();
  }
}
