package com.lucas.spring.helper.converters;

import com.lucas.spring.model.response.BaseErrorResponse;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link Exception} to {@link BaseErrorResponse}.
 */
@Component
public class RuntimeExceptionToBaseErrorResponseConverter
        implements Converter<RuntimeException, BaseErrorResponse> {
  /**
   * {@inheritDoc}
   */
  @Override
  public BaseErrorResponse convert(RuntimeException source) {
    return BaseErrorResponse
            .builder()
            .message(source.getMessage())
            .build();
  }
}
