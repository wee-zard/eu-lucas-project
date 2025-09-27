package com.lucas.spring.components.exif.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.exif.model.entity.ExifDataEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link ExifDataEntity} entities for the purpose
 * of sending back to the frontend not sensitive data.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class ExifDataDto implements RootDto {
  private final String exifKey;
  private final String exifValue;
}

