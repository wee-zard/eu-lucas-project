package com.lucas.spring.model.request.procedures;

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
  private Number xmin;
  private Number ymin;
  private Number xmax;
  private Number ymax;
}
