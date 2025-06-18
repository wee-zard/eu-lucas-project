package com.lucas.spring.model.request.filtering;

import com.lucas.spring.model.enums.FilterOption;
import com.lucas.spring.model.enums.OperatorOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
