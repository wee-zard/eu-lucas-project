package com.lucas.spring.components.exif.facade.impl;

import com.lucas.spring.components.exif.facade.ExifFacadeService;
import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import com.lucas.spring.components.exif.model.model.ExifDataModel;
import com.lucas.spring.components.exif.service.ExifDataService;
import com.lucas.spring.components.exif.service.ExifKeyService;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the method of {@link ExifFacadeService}.
 */
@Service
@AllArgsConstructor
public class ExifFacadeServiceImpl implements ExifFacadeService {
  private ExifKeyService exifKeyService;
  private ExifDataService exifDataService;

  /**
   * {@inheritDoc}
   */
  @Override
  public void saveImageExifHeader(
          final List<ExifDataModel> exifDataModels,
          final ImageEntity imageEntity
  ) {
    new ArrayList<>(new HashSet<>(
    exifDataModels
            .stream()
            .map(ExifDataModel::getExifKey)
            .collect(Collectors.toSet()))
    ).forEach(exifKey -> exifKeyService.isExifKeyIncludedInTheDb(exifKey));

    exifDataModels
        .stream()
        .map(exifDataModel -> ExifDataEntity
                .builder()
                .image(imageEntity)
                .exifValue(exifDataModel.getExifValue())
                .exifKey(exifKeyService.getExifKey(exifDataModel.getExifKey()))
                .build())
            .toList()
        .forEach(exifDataEntity -> exifDataService.save(exifDataEntity));
  }
}
