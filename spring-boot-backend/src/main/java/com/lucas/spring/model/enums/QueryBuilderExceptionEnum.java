package com.lucas.spring.model.enums;

import com.lucas.spring.model.expection.QueryBuilderException;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the error keys for the {@link QueryBuilderException}.
 */
@Getter
@AllArgsConstructor
public enum QueryBuilderExceptionEnum {
  QUERY_BUILDER_IS_NULL(""),
  QUERY_BUILDER_NOT_FOUND("");
  private final String message;
}
