package com.lucas.spring.components.coordinate.x.service.impl;

import com.lucas.spring.components.coordinate.x.enums.CoordinateXthExceptionEnum;
import com.lucas.spring.components.coordinate.x.exception.CoordinateXthException;
import com.lucas.spring.components.coordinate.x.model.entity.CoordinateXthEntity;
import com.lucas.spring.components.coordinate.x.repository.CoordinateXthRepository;
import com.lucas.spring.components.coordinate.x.service.CoordinateXthService;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link CoordinateXthService} service.
 */
@Service
@AllArgsConstructor
@CacheConfig(cacheNames = "CH_COORDINATE_X")
public class CoordinateXthServiceImpl implements CoordinateXthService {
  private final CoordinateXthRepository coordinateXthRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable
  public List<CoordinateXthEntity> getCoordinateXs() {
    return coordinateXthRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public CoordinateXthEntity getCoordinateX(final Integer coordinateX) {
    final Optional<CoordinateXthEntity> selectedCoordinateX = getCoordinateXs()
        .stream()
        .filter(coordinateXEntity -> Objects.equals(
                coordinateXEntity.getCoordinateX(),
                coordinateX))
        .findFirst();

    if (selectedCoordinateX.isEmpty()) {
      throw new CoordinateXthException(
              CoordinateXthExceptionEnum.COORDINATE_X_NOT_FOUND,
              coordinateX);
    }

    return selectedCoordinateX.get();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict
  public void addCoordinateX(final Integer coordinateX) {
    CoordinateXthEntity entity = CoordinateXthEntity
        .builder()
        .coordinateX(coordinateX)
        .build();
    coordinateXthRepository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void isCoordinateIncludedInTheDb(Integer coordinateX) {
    Optional<CoordinateXthEntity> selectedCoordinateX = getCoordinateXs()
        .stream()
        .filter(coordinateXEntity -> Objects.equals(
                coordinateXEntity.getCoordinateX(),
                coordinateX))
        .findAny();
    if (selectedCoordinateX.isEmpty()) {
      addCoordinateX(coordinateX);
    }
  }
}
