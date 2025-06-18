package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.QueryBuilderExceptionEnum;
import com.lucas.spring.model.expection.abstraction.BaseException;

/**
 * Custom throwable exception for the purpose of informing error about the Query builder.
 */
public class QueryBuilderException extends BaseException {
  /**
   * Init the throwable exception by message and params.
   *
   * @param message The error message.
   * @param param The param that caused the error to be thrown.
   */
  public QueryBuilderException(
          final QueryBuilderExceptionEnum message,
          final String... param) {
    super(BaseException.getStringFormatOfParams(String.valueOf(message), param));
  }
}