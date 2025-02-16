package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumerable keys of possible filter options.
 */
@Getter
@AllArgsConstructor
public enum FilterOption {
  YEAR("Év", "year"),
  COUNTRY("Ország", "country"),
  X_COORDINATE("X Koordináta", "coordinateX"),
  Y_COORDINATE("Y Koordináta", "coordinateY"),
  DIRECTION("Készítés iránya", "direction"),
  PROCEDURE_NAME("Eljárás neve", "name"),
  PROCEDURE_PARAMS("Eljárás pareméterei", "procedureLogParam"),
  IS_HOMOGENOUS("Homogén", "homogenous"),
  PROBABILITY("Detektálás értéke", "probabilityOfDetection"),
  PLANT_SPECIES("Növényfajok", "plantScientificName"),
  PLANT_NAME("Növények", "plantScientificName");
  /**
   * The name displayed in the side of the frontend.
   */
  private final String optionName;
  /**
   * The name of the table column associated with the enum.
   */
  private final String tableColumn;
}
