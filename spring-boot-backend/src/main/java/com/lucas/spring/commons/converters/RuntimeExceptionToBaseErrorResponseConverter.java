package com.lucas.spring.commons.converters;

import com.lucas.spring.commons.model.response.BaseErrorResponse;
import lombok.NonNull;
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
  public BaseErrorResponse convert(final @NonNull RuntimeException source) {
    return BaseErrorResponse.builder().message(source.getMessage()).build();
  }
}
