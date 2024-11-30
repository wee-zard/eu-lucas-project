package com.lucas.spring.helper.converters;

import com.lucas.spring.model.expection.abstraction.BaseException;
import com.lucas.spring.model.response.BaseErrorResponse;
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
  public BaseErrorResponse convert(BaseException source) {
    return BaseErrorResponse
            .builder()
            .message(source.getMessage())
            .errorAtParam(source.getErrorAtParam())
            .build();
  }
}
