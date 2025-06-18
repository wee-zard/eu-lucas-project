package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumerable keys of possible filter options.
 */
@Getter
@AllArgsConstructor
public enum FilterOption {
  YEAR("Év", "year", 1),
  COUNTRY("Ország", "country", 2),
  X_COORDINATE("X Koordináta", "coordinateX",3),
  Y_COORDINATE("Y Koordináta", "coordinateY", 4),
  DIRECTION("Készítés iránya", "direction", 5),
  PROCEDURE_NAME("Eljárás neve", "name", 6),
  PROCEDURE_PARAMS("Eljárás pareméterei", "procedureLogParam",7),
  IS_HOMOGENOUS("Homogén", "homogenous", 8),
  PROBABILITY("Detektálás értéke", "probabilityOfDetection",9),
  PLANT_SPECIES("Növényfajok", "plantScientificName", 10),
  PLANT_NAME("Növények", "plantScientificName", 11);
  /**
   * The name displayed in the side of the frontend.
   */
  private final String optionName;
  /**
   * The name of the table column associated with the enum.
   */
  private final String tableColumn;
  private final Integer id;
}
