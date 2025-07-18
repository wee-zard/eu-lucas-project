package com.lucas.spring.components.procedure.model.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * ...
 **/
@Getter
@AllArgsConstructor
public class ProcedureResultObject {
  private ProcedureResultPlant plant;

  /**
   * The bounding box that contains the detected plant.
   */
  private ProcedureResultBoundingBox boundingBox;

  /**
   * Tells that at what percentage the detected plant
   * is invasive.
   */
  private Integer confidence;
}
