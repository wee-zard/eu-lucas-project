package com.lucas.spring.components.exif.service.impl;

import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import com.lucas.spring.components.exif.repository.ExifDataRepository;
import com.lucas.spring.components.exif.service.ExifDataService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation of the {@link ExifDataService}.
 */
@Service
@AllArgsConstructor
public class ExifDataServiceImpl implements ExifDataService {
  private final ExifDataRepository exifDataRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void addExifDataModel(ExifDataEntity exifDataEntity) {
    exifDataRepository.save(exifDataEntity);
  }
}
