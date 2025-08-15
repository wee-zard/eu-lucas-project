package com.lucas.spring.components.image.converters;

import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.coordinate.y.model.entity.CoordinateYthEntity;
import com.lucas.spring.components.image.model.request.QueryComponent;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link QueryComponent} to {@link CoordinateYthEntity}.
 */
@Component
public class QueryComponentToCoordinaryYthEntityConverter
        implements Converter<QueryComponent, CoordinateYthEntity> {

  /**
   * {@inheritDoc}
   */
  @Override
  public CoordinateYthEntity convert(final @NonNull QueryComponent source) {
    final Integer value = FormatParseUtil.parseToInteger(source.getSelectInput());
    return CoordinateYthEntity.builder().coordinateY(value).build();
  }
}
