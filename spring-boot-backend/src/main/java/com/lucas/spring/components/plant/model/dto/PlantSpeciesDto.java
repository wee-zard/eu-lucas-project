package com.lucas.spring.components.plant.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.plant.model.entity.PlantSpeciesEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link PlantSpeciesEntity} entities.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class PlantSpeciesDto implements RootDto {
  private String plantScientificName;
}
