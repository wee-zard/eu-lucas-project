package com.lucas.spring.components.exif.service;

import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import java.util.List;

/**
 * An interface service where we store methods
 * related to the Exif data records.
 */
public interface ExifDataService {

  /**
   * Saves the exif data in the db.
   *
   * @param entity holds the exif values.
   */
  void save(ExifDataEntity entity);

  /**
   * Find all the exif header data by image id.
   *
   * @param imageId The id of the image.
   * @return Returns the list of exif data entities.
   */
  List<ExifDataEntity> findAllByImageId(Long imageId);

  /**
   * Delete all the exif data entities by image id.
   *
   * @param imageId The id of the image.
   */
  void deleteAllByImageId(Long imageId);
}
