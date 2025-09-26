package com.lucas.spring.components.exif.service.impl;

import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import com.lucas.spring.components.exif.repository.ExifDataRepository;
import com.lucas.spring.components.exif.service.ExifDataService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation of the {@link ExifDataService}.
 */
@Service
@AllArgsConstructor
public class ExifDataServiceImpl implements ExifDataService {
  private final ExifDataRepository repository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final ExifDataEntity entity) {
    repository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<ExifDataEntity> findAllByImageId(final Long imageId) {
    return repository.findAllByImageId(imageId);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void deleteAllByImageId(final Long imageId) {
    final List<ExifDataEntity> entities = findAllByImageId(imageId);
    entities.forEach(entity -> repository.deleteById(entity.getId()));
  }
}
