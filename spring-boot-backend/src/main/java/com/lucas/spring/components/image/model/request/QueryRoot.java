package com.lucas.spring.components.image.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Defines the root states of the Query Builder.
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QueryRoot {
  private Number id;
  private Number parentId;
}
