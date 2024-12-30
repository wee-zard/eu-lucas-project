package com.lucas.spring.services.facade;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.models.ExifDataModel;
import java.util.ArrayList;
import org.springframework.stereotype.Service;

/**
 * Defines methods related to the Exif data
 * extraction and process.
 */
@Service
public interface ExifFacadeService {
  /**
   * Upload image exif header information to the db.
   *
   * @param exifDataModels the exif header information of an image.
   * @param imageEntity the uploaded image.
   */
  void saveImageExifHeader(ArrayList<ExifDataModel> exifDataModels, ImageEntity imageEntity);
}
