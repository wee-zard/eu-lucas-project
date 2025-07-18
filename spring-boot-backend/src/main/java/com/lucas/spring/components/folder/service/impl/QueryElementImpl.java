package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.QueryBuilderEntity;
import com.lucas.spring.components.folder.model.entity.QueryElementEntity;
import com.lucas.spring.components.folder.repository.QueryElementRepository;
import com.lucas.spring.components.folder.service.QueryElementService;
import com.lucas.spring.components.image.model.request.QueryComponent;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the Query Element Service.
 */
@Service
@AllArgsConstructor
public class QueryElementImpl implements QueryElementService {
  private final QueryElementRepository queryElementRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public QueryElementEntity save(final QueryComponent component, final Long queryBuilderId) {
    final QueryElementEntity entity = QueryElementEntity.builder()
            .queryBuilderEntity(new QueryBuilderEntity(queryBuilderId))
            .operator(Byte.parseByte(String.valueOf(component.getOperatorInput().getId())))
            .filterTab(Byte.parseByte(String.valueOf(component.getSelectedFilterTab().getId())))
            .selectInput(component.getSelectInput())
            .textFieldInput(component.getTextFieldInput())
            .build();

    System.out.printf("[QUERY_COMPONENT]: %s%n", entity.toString());

    return queryElementRepository.save(entity);
  }
}
