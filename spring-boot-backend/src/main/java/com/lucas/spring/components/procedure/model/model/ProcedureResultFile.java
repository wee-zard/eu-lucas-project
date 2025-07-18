package com.lucas.spring.components.procedure.model.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the details about the file that have been used
 * with the procedure.
 */
@Getter
@AllArgsConstructor
public class ProcedureResultFile {
  /**
   * File name that is present in the db.
   */
  private String fileName;

  /**
   * The year when the image was taken.
   */
  private Number year;

  /**
   * The country code where the image was taken.
   * The default value is "HU" (Hungary).
   */
  private String countryCode;
}
