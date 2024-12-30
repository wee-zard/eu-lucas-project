package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.CreationDirectionRepository;
import com.lucas.spring.model.entity.CreationDirectionEntity;
import com.lucas.spring.model.expection.DirectionNotFoundException;
import com.lucas.spring.services.service.CreationDirectionService;
import java.util.ArrayList;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link CreationDirectionService} service.
 */
@AllArgsConstructor
@Service
public class CreationDirectionServiceImpl implements CreationDirectionService {
  private static final String SERVICE_CACHE_NAME = "CH_DIRECTIONS";
  private CreationDirectionRepository creationDirectionRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable(SERVICE_CACHE_NAME)
  public ArrayList<CreationDirectionEntity> getCreationDirections() {
    return creationDirectionRepository.fetchAllCreationDirections();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public CreationDirectionEntity getCreationDirection(final String directionToFetch) {
    final Optional<CreationDirectionEntity> selectedDirection = getCreationDirections()
        .stream()
        .filter(direction -> direction.getDirectionName().equals(directionToFetch))
        .findFirst();
    if (selectedDirection.isPresent()) {
      return selectedDirection.get();
    } else {
      throw new DirectionNotFoundException();
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(SERVICE_CACHE_NAME)
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
        .filter(item -> item.getDirectionName().equals(creationDirection))
        .findAny();
    if (entity.isEmpty()) {
      addCreationDirection(creationDirection);
    }
  }
}
