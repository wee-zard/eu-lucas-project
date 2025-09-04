package com.lucas.spring.components.plant.converters;

import com.lucas.spring.components.plant.model.dto.PlantDto;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
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
            .plantSpeciesName(source.getPlantSpeciesName() != null
                    ? source.getPlantSpeciesName().getPlantScientificName()
                    : null)
            .plantScientificName(source.getPlantScientificName())
            .build();
  }
}
