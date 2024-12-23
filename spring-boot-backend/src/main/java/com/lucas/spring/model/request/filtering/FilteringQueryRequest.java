package com.lucas.spring.model.request.filtering;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Stores the filters components that must be
 * applied to the Query Builder to filter the list
 * of images from the db.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FilteringQueryRequest {
  private QueryBuilder queryBuilder;
}
