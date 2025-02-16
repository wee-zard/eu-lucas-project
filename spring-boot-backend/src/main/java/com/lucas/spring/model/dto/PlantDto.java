package com.lucas.spring.model.dto;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.entity.PlantEntity;
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
