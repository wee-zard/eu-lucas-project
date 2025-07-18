package com.lucas.spring.components.plant.converters;

import com.lucas.spring.components.plant.model.dto.PlantSpeciesDto;
import com.lucas.spring.components.plant.model.entity.PlantSpeciesEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link PlantSpeciesEntity} to {@link PlantSpeciesDto}.
 */
@Component
public class PlantSpeciesToPlantSpeciesDtoConverter
        implements Converter<PlantSpeciesEntity, PlantSpeciesDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public PlantSpeciesDto convert(final PlantSpeciesEntity source) {
    return PlantSpeciesDto.builder().plantScientificName(source.getPlantScientificName()).build();
  }
}
