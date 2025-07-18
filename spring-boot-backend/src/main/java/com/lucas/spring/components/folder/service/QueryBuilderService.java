package com.lucas.spring.components.folder.service;

import com.lucas.spring.components.folder.model.entity.QueryBuilderEntity;
import com.lucas.spring.components.image.model.request.QueryMultiType;
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

  /**
   * Saves the query builder.
   *
   * @param entity The entity to save to examine and save.
   * @return Returns the saved entity.
   */
  QueryBuilderEntity save(QueryBuilderEntity entity);

  /**
   * Based on the provided params, constructs a new entity.
   *
   * @param query The query to examine and save.
   * @param parentId The id of the parent {@link QueryBuilderEntity}.
   * @return Returns the constructed entity.
   */
  QueryBuilderEntity create(QueryMultiType query, Long parentId);
}
