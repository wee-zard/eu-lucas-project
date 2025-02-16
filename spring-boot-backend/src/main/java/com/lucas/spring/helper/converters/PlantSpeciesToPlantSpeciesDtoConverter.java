package com.lucas.spring.helper.converters;

import com.lucas.spring.model.dto.PlantSpeciesDto;
import com.lucas.spring.model.entity.PlantSpeciesEntity;
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
