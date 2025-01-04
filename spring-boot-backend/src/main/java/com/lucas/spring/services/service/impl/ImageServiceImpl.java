package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.ImageRepository;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.services.service.ImageService;
import java.util.Optional;
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
  public Optional<ImageEntity> getImageByNameAndYear(final String name, final Number year) {
    return imageRepository.getEntityByNameAndYear(name, year);
  }
}
