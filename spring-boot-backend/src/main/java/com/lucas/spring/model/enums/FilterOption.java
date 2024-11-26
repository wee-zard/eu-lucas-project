package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Enumerable keys of possible filter options.
 */
@Getter
@AllArgsConstructor
public enum FilterOption {
  YEAR("Év"),
  COUNTRY("Ország"),
  X_COORDINATE("X Koordináta"),
  Y_COORDINATE("Y Koordináta"),
  DIRECTION("Készítés iránya"),
  EXIF_DATE("Exif adat"),
  PLANT("Növények"),
  ALGORITHM("Algoritmus");
  private final String optionName;
}
