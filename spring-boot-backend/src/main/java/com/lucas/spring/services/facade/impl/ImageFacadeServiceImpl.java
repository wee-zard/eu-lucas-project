package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.services.facade.ImageFacadeService;
import com.lucas.spring.services.service.CoordinateXService;
import com.lucas.spring.services.service.CoordinateYService;
import com.lucas.spring.services.service.CreationCountryService;
import com.lucas.spring.services.service.CreationDirectionService;
import com.lucas.spring.services.service.CreationYearService;
import com.lucas.spring.services.service.ImageService;
import java.util.ArrayList;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Defines methods on the images that uses other
 * components' services as well.
 */
@AllArgsConstructor
@Service
public class ImageFacadeServiceImpl implements ImageFacadeService {
  private final CreationYearService creationYearService;
  private final CreationDirectionService creationDirectionService;
  private final CreationCountryService creationCountryService;
  private final CoordinateXService coordinateXService;
  private final CoordinateYService coordinateYService;
  private final ImageService imageService;

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<ImageEntity> getImageEntity(final ImageRequest imageRequest) {
    if (!imageService.isImageNameAlreadyExists(imageRequest.getImageName())) {
      creationYearService.isCreationYearIncludedInTheDb(imageRequest.getYear());
      creationDirectionService.isCreationDirectionIncludedInTheDd(imageRequest.getDirectionName());
      creationCountryService.isCreationDirectionIncludedInTheDb(
              imageRequest.getCountryCode(),
              imageRequest.getCountryName()
      );
      coordinateXService.isCoordinateXIncludedInTheDb(imageRequest.getCoordinateX());
      coordinateYService.isCoordinateYIncludedInTheDb(imageRequest.getCoordinateY());
      return Optional.ofNullable(imageService.saveImage(
          ImageEntity
              .builder()
              .imageName(imageRequest.getImageName())
              .coordinateY(coordinateYService.getCoordinateY(imageRequest.getCoordinateY()))
              .coordinateX(coordinateXService.getCoordinateX(imageRequest.getCoordinateX()))
              .direction(creationDirectionService.getCreationDirection(
                      imageRequest.getDirectionName())
              )
              .country(creationCountryService.getCreationCountry(imageRequest.getCountryCode()))
              .year(creationYearService.getCreationYear(imageRequest.getYear()))
              .build()));
    } else {
      return Optional.empty();
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<ImageEntity> getRandomImage() {
    return imageService.getRandomImage();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ArrayList<ImageEntity> getRandomImages() {
    return imageService.getRandomImages();
  }
}
