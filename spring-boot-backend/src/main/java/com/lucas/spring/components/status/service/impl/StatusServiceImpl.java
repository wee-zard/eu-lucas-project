package com.lucas.spring.components.status.service.impl;

import com.lucas.spring.components.status.enums.StatusExceptionEnum;
import com.lucas.spring.components.status.exception.StatusException;
import com.lucas.spring.components.status.model.entity.StatusEntity;
import com.lucas.spring.components.status.repository.StatusRepository;
import com.lucas.spring.components.status.service.StatusService;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link StatusService} service.
 */
@AllArgsConstructor
@Service
@CacheConfig(cacheNames = "CH_STATUS")
public class StatusServiceImpl implements StatusService {
  private StatusRepository statusRepository;

  /**
   * {@inheritDoc}
   */
  @Cacheable
  @Override
  public List<StatusEntity> getStatuses() {
    return statusRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public StatusEntity getStatusById(final Long statusId) {
    final Optional<StatusEntity> statusEntity = statusRepository.findById(statusId);

    if (statusEntity.isEmpty()) {
      throw new StatusException(StatusExceptionEnum.STATUS_NOT_FOUND, statusId);
    } else {
      return statusEntity.get();
    }
  }
}
