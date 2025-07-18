package com.lucas.spring.components.plant.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link PlantEntity} entities.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class PlantDto implements RootDto {
  private Boolean isPlantInvasive;
  private String plantSpeciesName;
  private String plantScientificName;
}
