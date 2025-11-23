package com.lucas.spring.commons.services.impl;

import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.commons.services.CustomConversionService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

/**
 * Implements a service that will handle the conversions from
 * one type to another type.
 */
@Service
@AllArgsConstructor
public class CustomCustomConversionServiceImpl implements CustomConversionService {
  private final ConversionService conversionService;

  /**
   * {@inheritDoc}
   */
  public final <S, T> PageableResponse<T> convert(final Page<S> page, final Class<T> target) {
    final List<T> listOfDto = page.stream().map(source -> this.convert(source, target)).toList();
    return new PageableResponse<>(page, listOfDto);
  }

  /**
   * {@inheritDoc}
   */
  public final <S, T> List<T> convert(final List<S> list, final Class<T> target) {
    return list.stream().map(source -> this.convert(source, target)).toList();
  }

  /**
   * {@inheritDoc}
   */
  public final <S, T> T convert(final S source, final Class<T> target) {
    return conversionService.convert(source, target);
  }
}
