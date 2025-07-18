package com.lucas.spring.components.role.converters;

import com.lucas.spring.components.role.model.dto.RoleDto;
import com.lucas.spring.components.role.model.entity.RoleEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link RoleEntity} to {@link RoleDto}.
 */
@Component
public class RoleEntityToRoleDtoConverter implements Converter<RoleEntity, RoleDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public RoleDto convert(final RoleEntity source) {
    return RoleDto.builder()
            .id(source.getId())
            .roleName(source.getRoleName())
            .build();
  }
}
