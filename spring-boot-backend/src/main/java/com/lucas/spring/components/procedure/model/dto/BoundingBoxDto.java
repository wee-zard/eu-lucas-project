package com.lucas.spring.components.procedure.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.plant.model.dto.PlantDto;
import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link BoundingBoxEntity} entities for the purpose
 * of sending back to the frontend not sensitive data.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class BoundingBoxDto implements RootDto {
  private Number id;
  private Number probabilityOfDetection;
  private Number minCoordinateX;
  private Number maxCoordinateX;
  private Number minCoordinateY;
  private Number maxCoordinateY;
  private Boolean isHomogenous;
  private PlantDto plant;
}
