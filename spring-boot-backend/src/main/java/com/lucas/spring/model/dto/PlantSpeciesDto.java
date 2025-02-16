package com.lucas.spring.model.dto;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.entity.PlantSpeciesEntity;
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
