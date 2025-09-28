package com.lucas.spring.components.exif.converters;

import com.lucas.spring.components.exif.model.dto.ExifKeyDto;
import com.lucas.spring.components.exif.model.entity.ExifKeyEntity;
import com.lucas.spring.components.image.model.dto.ImageDto;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link ExifKeyEntity}
 * to {@link ImageDto}.
 */
@Component
public class ExifKeyEntityToExifKeyDtoConverter
        implements Converter<ExifKeyEntity, ExifKeyDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public ExifKeyDto convert(final @NonNull ExifKeyEntity source) {
    return ExifKeyDto.builder()
            .id(source.getId())
            .name(source.getExifKeyName())
            .build();
  }
}
