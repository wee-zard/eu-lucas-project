package com.lucas.spring.components.image.converters;

import com.lucas.spring.components.country.model.entity.CreationCountryEntity;
import com.lucas.spring.components.image.model.request.QueryComponent;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link QueryComponent} to {@link CreationCountryEntity}.
 */
@Component
public class QueryComponentToCreationCountryConverter
        implements Converter<QueryComponent, CreationCountryEntity> {

  /**
   * {@inheritDoc}
   */
  @Override
  public CreationCountryEntity convert(final @NonNull QueryComponent source) {
    return CreationCountryEntity.builder().countryCode(source.getSelectInput()).build();
  }
}
