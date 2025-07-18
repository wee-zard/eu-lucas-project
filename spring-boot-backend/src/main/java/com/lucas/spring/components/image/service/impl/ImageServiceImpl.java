package com.lucas.spring.components.image.service.impl;

import com.lucas.spring.components.image.enums.ImageExceptionEnums;
import com.lucas.spring.components.image.exception.ImageException;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.image.model.request.ImageRequest;
import com.lucas.spring.components.image.repository.ImageRepository;
import com.lucas.spring.components.image.service.ImageService;
import com.lucas.spring.components.procedure.model.model.ProcedureResultFile;
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
