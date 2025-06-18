package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.QueryBuilderEntity;
import com.lucas.spring.model.request.filtering.QueryMultiType;
import org.springframework.stereotype.Service;

/**
 * Service for the Query Builders.
 */
@Service
public interface QueryBuilderService {
  /**
   * Saves the query builder.
   *
   * @param query The query to examine and save.
   * @param parentId The id of the parent {@link QueryBuilderEntity}.
   * @return Returns the saved entity.
   */
  QueryBuilderEntity save(QueryMultiType query, Long parentId);
}
