package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.FolderEntity;
import com.lucas.spring.model.entity.QueryBuilderEntity;
import com.lucas.spring.model.enums.QueryBuilderExceptionEnum;
import com.lucas.spring.model.expection.QueryBuilderException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.filtering.QueryMultiType;
import com.lucas.spring.model.request.folder.FolderCreationRequest;
import com.lucas.spring.services.facade.FolderFacade;
import com.lucas.spring.services.service.FolderContentService;
import com.lucas.spring.services.service.FolderService;
import com.lucas.spring.services.service.QueryBuilderService;
import com.lucas.spring.services.service.QueryElementService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link FolderFacade}.
 */
@Service
@AllArgsConstructor
public class FolderFacadeImpl implements FolderFacade {
  private final FolderService folderService;
  private final QueryBuilderService queryBuilderService;
  private final QueryElementService queryElementService;
  private final FolderContentService folderContentService;

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void save(final FolderCreationRequest request, final AuthenticatedUser user) {
    final FolderEntity folder = folderService.save(
            request.getTitle(), request.getDescription(), user);

    request.getQueriedImages().forEach(obj -> {
      final QueryBuilderEntity queryBuilderEntity = this.saveQueryMultiType(obj.getQuery(), null);

      if (queryBuilderEntity == null) {
        throw new QueryBuilderException(QueryBuilderExceptionEnum.QUERY_BUILDER_IS_NULL);
      }

      //obj.getImageIds().forEach(imageId -> this.folderContentService.save(folder.getId(), imageId, queryBuilderEntity.getId()));
    });
  }

  private QueryBuilderEntity saveQueryMultiType(
          final QueryMultiType query,
          final Long parentQueryId
  ) {
    if (query.getListOfQueries() != null && !query.getListOfQueries().isEmpty()) {
      final QueryBuilderEntity entity = queryBuilderService.save(query, parentQueryId);

      query.getListOfQueries().forEach(
              queryMultiType ->
                      this.saveQueryMultiType(queryMultiType, entity.getId()));

      return entity;
    } else if (query.getListOfComponents() != null && !query.getListOfComponents().isEmpty()) {
      final QueryBuilderEntity entity = queryBuilderService.save(query, parentQueryId);

      query.getListOfComponents().forEach(component ->
              this.queryElementService.save(component, entity.getId()));

      return entity;
    }

    return null;
  }
}
