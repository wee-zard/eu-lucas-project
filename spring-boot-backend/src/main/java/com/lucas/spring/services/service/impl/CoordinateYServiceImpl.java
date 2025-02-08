package com.lucas.spring.services.service.impl;

import com.lucas.spring.repositories.CoordinateYRepository;
import com.lucas.spring.model.entity.CoordinateYEntity;
import com.lucas.spring.model.expection.CoordinateYNotFoundException;
import com.lucas.spring.services.service.CoordinateYService;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link CoordinateYService} service.
 */
@Service
@AllArgsConstructor
public class CoordinateYServiceImpl implements CoordinateYService {
  private static final String SERVICE_CACHE_NAME = "CH_COORDINATE_Y";
  private final CoordinateYRepository coordinateYRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable(SERVICE_CACHE_NAME)
  public ArrayList<CoordinateYEntity> getCoordinateYs() {
    return coordinateYRepository.fetchAllCoordinateYEntities();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public CoordinateYEntity getCoordinateY(final Integer coordinateY) {
    final Optional<CoordinateYEntity> selectedCoordinateY = getCoordinateYs()
        .stream()
        .filter(coordinateYEntity -> Objects.equals(
                coordinateYEntity.getCoordinateY(),
                coordinateY))
        .findFirst();
    if (selectedCoordinateY.isPresent()) {
      return selectedCoordinateY.get();
    } else {
      throw new CoordinateYNotFoundException(coordinateY);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(SERVICE_CACHE_NAME)
  public void addCoordinateY(final Integer coordinateY) {
    final CoordinateYEntity entity = CoordinateYEntity
            .builder()
            .coordinateY(coordinateY)
            .build();
    coordinateYRepository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void isCoordinateYIncludedInTheDb(final Integer coordinateY) {
    final Optional<CoordinateYEntity> selectedCoordinateY = getCoordinateYs()
        .stream()
        .filter(coordinateYEntity -> Objects.equals(
                coordinateYEntity.getCoordinateY(),
                coordinateY))
        .findAny();
    if (selectedCoordinateY.isEmpty()) {
      addCoordinateY(coordinateY);
    }
  }
}
