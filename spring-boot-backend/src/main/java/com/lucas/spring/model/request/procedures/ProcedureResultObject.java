package com.lucas.spring.model.request.procedures;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * ...
 **/
@Getter
@AllArgsConstructor
public class ProcedureResultObject {

  /**
   * The plant that has been detected by the procedure.
   */
  private String plantName;

  /**
   * Tells whether the plant is invasive or not.
   */
  private Boolean isInvasive;

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
