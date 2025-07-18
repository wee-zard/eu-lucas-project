package com.lucas.spring.components.image.converters;

import com.lucas.spring.components.image.model.dto.ImageDto;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link ImageEntity}
 * to {@link ImageDto}.
 */
@Component
public class ImageEntityToImageDtoConverter
        implements Converter<ImageEntity, ImageDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public ImageDto convert(final ImageEntity source) {
    return ImageDto.builder()
            .id(source.getId())
            .year(source.getYear().getYear())
            .imageName(source.getImageName())
            .country(source.getCountry().getCountryCode())
            .direction(source.getDirection().getDirectionName())
            .coordinateX(source.getCoordinateX().getCoordinateX())
            .coordinateY(source.getCoordinateY().getCoordinateY())
            .build();
  }
}
