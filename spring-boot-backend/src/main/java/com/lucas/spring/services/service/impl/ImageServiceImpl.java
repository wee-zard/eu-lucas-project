package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.enums.ImageExceptionEnums;
import com.lucas.spring.model.expection.ImageException;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.model.request.procedures.ProcedureResultFile;
import com.lucas.spring.repositories.ImageRepository;
import com.lucas.spring.services.service.ImageService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * A service where we store methods related to the Images.
 */
@AllArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {
  private final ImageRepository imageRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isImageAlreadyExists(final ImageRequest imageRequest) {
    return imageRepository.isImageAlreadyExists(
            imageRequest.getYear(),
            imageRequest.getCountryCode(),
            imageRequest.getCoordinateX(),
            imageRequest.getCoordinateY(),
            imageRequest.getImageName(),
            imageRequest.getDirectionName()
    ).isPresent();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ImageEntity saveImage(final ImageEntity imageEntity) {
    return imageRepository.save(imageEntity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ImageEntity getImageByNameAndYear(final String name, final Number year) {
    return imageRepository.getEntityByNameAndYear(name, year)
            .orElseThrow(() -> new ImageException(
                    ImageExceptionEnums.IMAGE_NOT_FOUND,
                    year.toString(), name));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<ImageEntity> getImagesByProcedureFiles(final List<ProcedureResultFile> files) {
    return files.stream()
            .map(file -> getImageByNameAndYear(file.getFileName(), file.getYear()))
            .toList();
  }
}
