package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.QueryElementEntity;
import com.lucas.spring.model.request.filtering.QueryComponent;
import org.springframework.stereotype.Service;

/**
 * Service of the Query Element Entity.
 */
@Service
public interface QueryElementService {

  /**
   * Save the component.
   *
   * @param component The component to save.
   * @param queryBuilderId The id of the query builder that constructed
   *                       these components.
   * @return Returns the saved component.
   */
  QueryElementEntity save(QueryComponent component, Long queryBuilderId);
}
