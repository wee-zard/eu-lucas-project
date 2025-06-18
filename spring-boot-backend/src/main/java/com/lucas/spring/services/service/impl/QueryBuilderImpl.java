package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.QueryBuilderEntity;
import com.lucas.spring.model.enums.QueryBuilderExceptionEnum;
import com.lucas.spring.model.expection.QueryBuilderException;
import com.lucas.spring.model.request.filtering.QueryMultiType;
import com.lucas.spring.repositories.QueryBuilderRepository;
import com.lucas.spring.services.service.QueryBuilderService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link QueryBuilderService}.
 */
@Service
@AllArgsConstructor
public class QueryBuilderImpl implements QueryBuilderService {
  private final QueryBuilderRepository queryBuilderRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public QueryBuilderEntity save(final QueryMultiType query, final Long parentId) {
    final QueryBuilderEntity entity = QueryBuilderEntity.builder()
            .parent(new QueryBuilderEntity(parentId))
            .type(query.getQueryType().getId().booleanValue())
            .relationship(query.getQueryElementRelation() != null
                    ? query.getQueryElementRelation().getId().booleanValue()
                    : null)
            .build();

    System.out.printf("[QUERY_BUILDER]: %s%n", entity.toString());

    return this.queryBuilderRepository.save(entity);
  }
}
