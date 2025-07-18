package com.lucas.spring.components.folder.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the logical relations between query components.
 */
@Getter
@AllArgsConstructor
public enum QueryElementRelations {
  AND(true),
  OR(false);
  public final Boolean id;
}
