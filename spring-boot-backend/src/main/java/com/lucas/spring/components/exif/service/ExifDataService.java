package com.lucas.spring.components.exif.service;

import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the Exif data records.
 */
@Service
public interface ExifDataService {
  /**
   * Saves the exif data in the db.
   *
   * @param exifDataEntity holds the exif values.
   */
  void addExifDataModel(ExifDataEntity exifDataEntity);
}
