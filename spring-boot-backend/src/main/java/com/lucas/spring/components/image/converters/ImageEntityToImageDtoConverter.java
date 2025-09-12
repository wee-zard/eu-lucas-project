package com.lucas.spring.components.image.converters;

import com.lucas.spring.commons.utils.CommonConversionUtil;
import com.lucas.spring.components.image.model.dto.ImageDto;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import lombok.NonNull;
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
  public ImageDto convert(final @NonNull ImageEntity source) {
    return CommonConversionUtil.toImageDto(source);
  }
}
