package com.lucas.spring.components.user.converters;

import com.lucas.spring.components.user.model.dto.UserDto;
import com.lucas.spring.components.user.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link UserEntity} to {@link UserDto}.
 */
@Component
@AllArgsConstructor
public class UserEntityToUserDtoConverter
        implements Converter<UserEntity, UserDto> {

  /**
   * {@inheritDoc}
   */
  @Override
  public UserDto convert(final UserEntity source) {
    return UserDto.builder()
            .id(source.getId())
            .userName(source.getUserName())
            .creationTime(source.getCreatedAt())
            .statusName(source.getStatus().getStatusName())
            .statusId(source.getStatus().getId())
            .roleName(source.getRole().getRoleName())
            .roleId(source.getRole().getId())
            .profilePicture(source.getProfilePictureBase64())
            .build();
  }
}