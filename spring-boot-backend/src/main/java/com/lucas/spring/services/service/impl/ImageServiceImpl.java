package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.ImageRepository;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.services.service.ImageService;
import java.util.ArrayList;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * A service where we store methods related to the Images.
 */
@AllArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {
  private ImageRepository imageRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isImageNameAlreadyExists(String imageName) {
    return imageRepository.isImageNameAlreadyExists(imageName).isPresent();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ImageEntity saveImage(ImageEntity imageEntity) {
    return imageRepository.save(imageEntity);
  }

  @Override
  public Optional<ImageEntity> getRandomImage() {
    return imageRepository.getRandomImage();
  }

  @Override
  public ArrayList<ImageEntity> getRandomImages() {
    return imageRepository.getRandomImages();
  }
}
