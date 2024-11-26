package com.lucas.spring.model.request.filtering;

import com.lucas.spring.model.enums.FormLogicalExpression;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Describes exactly what relationship has between components,
 * while naming the logical expression that connects them.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FormRelation {
  /**
   * Holds the id of the input component.
   */
  private Number inputComponentId;
  /**
   * Holds the id of the output component.
   */
  private Number outputComponentId;
  /**
   * Defines the relationship between the component.
   */
  private FormLogicalExpression logicalExpression;
}
