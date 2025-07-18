package com.lucas.spring.components.procedure.model.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * ...
 **/
@Getter
@AllArgsConstructor
public class ProcedureResultPlant {
  /**
   * The plant that has been detected by the procedure.
   */
  private String plantName;

  /**
   * Tells whether the plant is invasive or not.
   */
  private Boolean isInvasive;
}
