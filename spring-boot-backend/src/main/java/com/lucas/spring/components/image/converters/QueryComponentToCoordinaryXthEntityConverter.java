package com.lucas.spring.components.image.converters;

import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.coordinate.x.model.entity.CoordinateXthEntity;
import com.lucas.spring.components.image.model.request.QueryComponent;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link QueryComponent} to {@link CoordinateXthEntity}.
 */
@Component
public class QueryComponentToCoordinaryXthEntityConverter
        implements Converter<QueryComponent, CoordinateXthEntity> {

  /**
   * {@inheritDoc}
   */
  @Override
  public CoordinateXthEntity convert(final @NonNull QueryComponent source) {
    final Integer value = FormatParseUtil.parseToInteger(source.getSelectInput());
    return CoordinateXthEntity.builder().coordinateX(value).build();
  }
}
