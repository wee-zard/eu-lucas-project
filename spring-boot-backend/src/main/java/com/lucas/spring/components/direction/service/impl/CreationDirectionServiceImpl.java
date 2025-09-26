package com.lucas.spring.components.direction.service.impl;

import com.lucas.spring.components.direction.enums.DirectionExceptionEnum;
import com.lucas.spring.components.direction.exception.DirectionException;
import com.lucas.spring.components.direction.model.entity.CreationDirectionEntity;
import com.lucas.spring.components.direction.repository.CreationDirectionRepository;
import com.lucas.spring.components.direction.service.CreationDirectionService;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link CreationDirectionService} service.
 */
@AllArgsConstructor
@Service
@CacheConfig(cacheNames = "CH_DIRECTIONS")
public class CreationDirectionServiceImpl implements CreationDirectionService {
  private CreationDirectionRepository creationDirectionRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable
  public List<CreationDirectionEntity> getCreationDirections() {
    return creationDirectionRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public CreationDirectionEntity getCreationDirection(final String directionToFetch) {
    final Optional<CreationDirectionEntity> selectedDirection = getCreationDirections()
        .stream()
        .filter(direction -> Objects.equals(direction.getDirectionName(), directionToFetch))
        .findFirst();

    if (selectedDirection.isEmpty()) {
      throw new DirectionException(DirectionExceptionEnum.DIRECTION_NOT_FOUND, directionToFetch);
    }

    return selectedDirection.get();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(allEntries = true)
  public void addCreationDirection(final String creationDirection) {
    final CreationDirectionEntity entity = CreationDirectionEntity
            .builder()
            .directionName(creationDirection)
            .build();
    creationDirectionRepository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void isCreationDirectionIncludedInTheDd(final String creationDirection) {
    final Optional<CreationDirectionEntity> entity = getCreationDirections()
        .stream()
        .filter(item -> Objects.equals(item.getDirectionName(), creationDirection))
        .findAny();

    if (entity.isEmpty()) {
      addCreationDirection(creationDirection);
    }
  }
}
