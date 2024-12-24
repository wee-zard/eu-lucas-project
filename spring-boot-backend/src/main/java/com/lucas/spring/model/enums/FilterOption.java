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
  COUNTRY("Ország", "country_code"),
  X_COORDINATE("X Koordináta", "coordinate_x"),
  Y_COORDINATE("Y Koordináta", "coordinate_y"),
  DIRECTION("Készítés iránya", "direction_name"),
  EXIF_DATA("Exif adat", null), //TODO: ...
  PLANT("Növények", null), //TODO: ...
  ALGORITHM("Algoritmus", null); //TODO: ...
  /**
   * The name displayed in the side of the frontend.
   */
  private final String optionName;
  /**
   * The name of the table column associated with the enum.
   */
  private final String tableColumn;
}
