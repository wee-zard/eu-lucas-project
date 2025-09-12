package com.lucas.spring.components.plant.converters;

import com.lucas.spring.commons.utils.CommonConversionUtil;
import com.lucas.spring.components.plant.model.dto.PlantDto;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link PlantEntity} to {@link PlantDto}.
 */
@Component
public class PlantEntityToPlantEntityDtoConverter implements Converter<PlantEntity, PlantDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public PlantDto convert(final @NonNull PlantEntity source) {
    return CommonConversionUtil.toPlantDto(source);
  }
}
