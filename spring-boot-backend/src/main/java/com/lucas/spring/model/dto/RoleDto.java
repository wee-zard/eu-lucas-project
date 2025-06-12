package com.lucas.spring.model.dto;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.entity.RoleEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link RoleEntity} entities for the purpose
 * of sending back to the frontend no sensitive data.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class RoleDto implements RootDto {
  private int id;
  private String roleName;
}
