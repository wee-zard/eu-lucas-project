package com.lucas.spring.components.coordinate.y.service.impl;

import com.lucas.spring.components.coordinate.y.enums.CoordinateYthExceptionEnum;
import com.lucas.spring.components.coordinate.y.exception.CoordinateYthException;
import com.lucas.spring.components.coordinate.y.model.entity.CoordinateYthEntity;
import com.lucas.spring.components.coordinate.y.repository.CoordinateYthRepository;
import com.lucas.spring.components.coordinate.y.service.CoordinateYthService;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link CoordinateYthService} service.
 */
@Service
@AllArgsConstructor
@CacheConfig(cacheNames = "CH_COORDINATE_Y")
public class CoordinateYthServiceImpl implements CoordinateYthService {
  private final CoordinateYthRepository coordinateYthRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable
  public List<CoordinateYthEntity> getCoordinateYs() {
    return coordinateYthRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public CoordinateYthEntity getCoordinateY(final Integer coordinateY) {
    final Optional<CoordinateYthEntity> selectedCoordinateY = getCoordinateYs()
        .stream()
        .filter(coordinateYEntity -> Objects.equals(
                coordinateYEntity.getCoordinateY(),
                coordinateY))
        .findFirst();

    if (selectedCoordinateY.isEmpty()) {
      throw new CoordinateYthException(
              CoordinateYthExceptionEnum.COORDINATE_Y_NOT_FOUND,
              coordinateY);
    }

    return selectedCoordinateY.get();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(allEntries = true)
  public void addCoordinateY(final Integer coordinateY) {
    final CoordinateYthEntity entity = CoordinateYthEntity
            .builder()
            .coordinateY(coordinateY)
            .build();
    coordinateYthRepository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void isCoordinateIncludedInTheDb(final Integer coordinateY) {
    final Optional<CoordinateYthEntity> selectedCoordinateY = getCoordinateYs()
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
