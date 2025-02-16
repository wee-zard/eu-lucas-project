package com.lucas.spring.helper.converters;

import com.lucas.spring.model.dto.PlantDto;
import com.lucas.spring.model.entity.PlantEntity;
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
  public PlantDto convert(final PlantEntity source) {
    return PlantDto.builder()
            .isPlantInvasive(source.getIsPlantInvasive())
            .plantSpeciesName(source.getPlantSpeciesName().getPlantScientificName())
            .plantScientificName(source.getPlantScientificName())
            .build();
  }
}
