package com.lucas.spring.components.image.facade.impl;

import com.lucas.spring.components.coordinate.x.service.CoordinateXthService;
import com.lucas.spring.components.coordinate.y.service.CoordinateYthService;
import com.lucas.spring.components.country.service.CreationCountryService;
import com.lucas.spring.components.direction.service.CreationDirectionService;
import com.lucas.spring.components.image.facade.ImageFacadeService;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.image.model.request.ImageRequest;
import com.lucas.spring.components.image.service.ImageService;
import com.lucas.spring.components.year.service.CreationYearService;
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
  private final CoordinateXthService coordinateXthService;
  private final CoordinateYthService coordinateYthService;
  private final ImageService imageService;

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<ImageEntity> getImageEntity(final ImageRequest imageRequest) {
    if (!imageService.isImageAlreadyExists(imageRequest)) {
      creationYearService.isCreationYearIncludedInTheDb(imageRequest.getYear());
      creationDirectionService.isCreationDirectionIncludedInTheDd(imageRequest.getDirectionName());
      creationCountryService.isCreationDirectionIncludedInTheDb(
              imageRequest.getCountryCode(),
              imageRequest.getCountryName()
      );
      coordinateXthService.isCoordinateIncludedInTheDb(imageRequest.getCoordinateX());
      coordinateYthService.isCoordinateIncludedInTheDb(imageRequest.getCoordinateY());
      return Optional.ofNullable(imageService.saveImage(
          ImageEntity
              .builder()
              .imageName(imageRequest.getImageName())
              .coordinateY(coordinateYthService.getCoordinateY(imageRequest.getCoordinateY()))
              .coordinateX(coordinateXthService.getCoordinateX(imageRequest.getCoordinateX()))
              .direction(creationDirectionService.getCreationDirection(
                      imageRequest.getDirectionName())
              )
              .country(creationCountryService.getCreationCountry(imageRequest.getCountryCode()))
              .year(creationYearService.getCreationYear(imageRequest.getYear()))
              .isHeaderExtracted(false)
              .build()));
    } else {
      return Optional.empty();
    }
  }
}
