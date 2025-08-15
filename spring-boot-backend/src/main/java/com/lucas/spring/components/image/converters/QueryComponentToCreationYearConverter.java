package com.lucas.spring.components.image.converters;

import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.image.model.request.QueryComponent;
import com.lucas.spring.components.year.model.entity.CreationYearEntity;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link QueryComponent} to {@link CreationYearEntity}.
 */
@Component
public class QueryComponentToCreationYearConverter
        implements Converter<QueryComponent, CreationYearEntity> {

  /**
   * {@inheritDoc}
   */
  @Override
  public CreationYearEntity convert(final @NonNull QueryComponent source) {
    final Integer value = FormatParseUtil.parseToInteger(source.getSelectInput());
    return CreationYearEntity.builder().year(value).build();
  }
}
