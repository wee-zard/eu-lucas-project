package com.lucas.spring.commons.converters;

import com.lucas.spring.commons.exception.abstraction.BaseException;
import com.lucas.spring.commons.model.response.BaseErrorResponse;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link BaseException} to {@link BaseErrorResponse}.
 */
@Component
public class BaseExceptionToBaseErrorResponseConverter
        implements Converter<BaseException, BaseErrorResponse> {
  /**
   * {@inheritDoc}
   */
  @Override
  public BaseErrorResponse convert(final BaseException source) {
    return BaseErrorResponse.builder().message(source.getMessage()).build();
  }
}
