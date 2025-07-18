package com.lucas.spring.components.image.model.request;

import com.lucas.spring.components.image.enums.FilterOption;
import com.lucas.spring.components.image.enums.OperatorOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * TODO: javadoc.
 */
@ToString
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryComponent extends QueryRoot {
  private FilterOption selectedFilterTab;
  private String selectInput;
  private OperatorOption operatorInput;
  private String textFieldInput;
}
