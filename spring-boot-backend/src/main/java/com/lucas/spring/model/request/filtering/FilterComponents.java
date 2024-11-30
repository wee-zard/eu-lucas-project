package com.lucas.spring.model.request.filtering;

import com.lucas.spring.model.enums.FilterOption;
import com.lucas.spring.model.enums.OperatorOption;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * A list of input components that is wrapped into a group.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FilterComponents {
  private Number groupFormId;
  private Number inputFormId;
  private FilterOption selectedFilterTab;
  private String selectInput;
  private OperatorOption operatorInput;
  private String textFieldInput;
}
