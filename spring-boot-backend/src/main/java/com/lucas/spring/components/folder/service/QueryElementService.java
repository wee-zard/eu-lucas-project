package com.lucas.spring.components.folder.service;

import com.lucas.spring.components.folder.model.entity.QueryElementEntity;
import com.lucas.spring.components.image.model.request.QueryComponent;
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
