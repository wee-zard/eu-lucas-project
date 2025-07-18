package com.lucas.spring.components.image.converters;

import com.lucas.spring.components.direction.model.entity.CreationDirectionEntity;
import com.lucas.spring.components.image.model.request.QueryComponent;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link QueryComponent} to {@link CreationDirectionEntity}.
 */
@Component
public class QueryComponentToCreationDirectionEntityConverter
        implements Converter<QueryComponent, CreationDirectionEntity> {

  /**
   * {@inheritDoc}
   */
  @Override
  public CreationDirectionEntity convert(final @NonNull QueryComponent source) {
    return CreationDirectionEntity.builder().directionName(source.getSelectInput()).build();
  }
}
