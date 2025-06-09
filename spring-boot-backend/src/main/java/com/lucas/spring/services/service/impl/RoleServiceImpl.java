package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.RoleEntity;
import com.lucas.spring.model.enums.RoleExceptionEnum;
import com.lucas.spring.model.expection.RoleException;
import com.lucas.spring.repositories.RoleRepository;
import com.lucas.spring.services.service.RoleService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Methods related to the Users Roles.
 */
@Service
@AllArgsConstructor
@CacheConfig(cacheNames = "CH_ROLE")
public class RoleServiceImpl implements RoleService {
  private final RoleRepository roleRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public RoleEntity getById(final Long id) throws RuntimeException {
    return this.roleRepository.findById(id)
            .orElseThrow(() -> new RoleException(RoleExceptionEnum.NOT_FOUND, String.valueOf(id)));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable
  public List<RoleEntity> getAll() {
    return this.roleRepository.findAll();
  }
}
