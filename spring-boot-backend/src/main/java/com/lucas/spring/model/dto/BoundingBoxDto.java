package com.lucas.spring.model.dto;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.entity.BoundingBoxEntity;
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
