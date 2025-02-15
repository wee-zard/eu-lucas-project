package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Holds the error messages that could occur while filtering the images
 * by the provided form components.
 */
@Getter
@AllArgsConstructor
public enum ImageFilteringEnum {
  NO_PREDICATE_GENERATED_BY_FILTERS("no-predicate-generated-by-filters"),
  NO_FILTER_COMPONENT_PROVIDED("no-filter-component-provided"),
  NO_RECURSIVE_GROUP_RELATION_PROVIDED("no-recursive-group-relationship-provided"),
  NO_RECURSIVE_GROUP_RELATION_PROVIDED_BY_GROUP_ID("no-recursive-group-relationship-provided-by-group-id"),
  LIST_OF_QUERIES_ARE_EMPTY("list-of-queries-are-empty"),
  PAGEABLE_PROPERTIES_ARE_NOT_PROVIDED("pageable-properties-are-not-provided"),
  NO_COMPONENT_OR_GROUP_PROVIDED("no-component-or-group-provided"),
  UNKNOWN_OR_NO_OPERATOR_PROVIDED("unknown-or-no-operator-provided"),
  UNKNOWN_OR_NO_LOGICAL_EXPRESSION_PROVIDED("unknown-or-no-logical-expression-provided"),
  UNKNOWN_OR_NO_FILTER_TAB_PROVIDED("unknown-or-no-filter-tab-provided");
  private final String messageName;
}
