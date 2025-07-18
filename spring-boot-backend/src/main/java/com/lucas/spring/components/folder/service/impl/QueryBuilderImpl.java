package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.QueryBuilderEntity;
import com.lucas.spring.components.folder.repository.QueryBuilderRepository;
import com.lucas.spring.components.folder.service.QueryBuilderService;
import com.lucas.spring.components.image.model.request.QueryMultiType;
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
    return this.queryBuilderRepository.save(this.create(query, parentId));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public QueryBuilderEntity save(final QueryBuilderEntity entity) {
    System.out.printf("[QUERY_BUILDER]: %s%n", entity.toString());

    return this.queryBuilderRepository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public QueryBuilderEntity create(final QueryMultiType query, final Long parentId) {
    return QueryBuilderEntity.builder()
            .parent(parentId != null ? this.getEntityById(parentId) : null)
            .type(query.getQueryType().getId())
            .relationship(query.getQueryElementRelation() != null
                    ? query.getQueryElementRelation().getId()
                    : null)
            .build();
  }

  private QueryBuilderEntity getEntityById(final Long id) {
    return queryBuilderRepository.getReferenceById(id);
  }
}
