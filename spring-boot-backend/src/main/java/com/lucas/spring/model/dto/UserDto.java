package com.lucas.spring.model.dto;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.entity.UserEntity;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link UserEntity} entities.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class UserDto implements RootDto {
  private Long id;
  private String userName;
  private Instant creationTime;
  private String statusName;
  private String roleName;
  private String profilePicture;
}
