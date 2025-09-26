package com.lucas.spring.components.exif.facade;

import com.lucas.spring.components.exif.model.model.ExifDataModel;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import java.util.List;

/**
 * Defines methods related to the Exif data
 * extraction and process.
 */
public interface ExifFacadeService {
  /**
   * Upload image exif header information to the db.
   *
   * @param exifDataModels the exif header information of an image.
   * @param imageEntity the uploaded image.
   */
  void saveImageExifHeader(List<ExifDataModel> exifDataModels, ImageEntity imageEntity);
}
