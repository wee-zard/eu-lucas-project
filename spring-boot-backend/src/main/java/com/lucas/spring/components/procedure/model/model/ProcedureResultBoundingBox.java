package com.lucas.spring.components.procedure.model.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * Stores the points of the bounding box
 * that contains the detected plant in the image.
 **/
@Builder
@Getter
@AllArgsConstructor
public class ProcedureResultBoundingBox {
  private Integer xmin;
  private Integer ymin;
  private Integer xmax;
  private Integer ymax;
}
