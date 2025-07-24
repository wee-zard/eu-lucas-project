package com.lucas.spring.components.folder.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.folder.enums.QueryBuilderExceptionEnum;
import com.lucas.spring.components.folder.exception.QueryBuilderException;
import com.lucas.spring.components.folder.facade.FolderFacade;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.entity.QueryBuilderEntity;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;
import com.lucas.spring.components.folder.service.FolderContentService;
import com.lucas.spring.components.folder.service.FolderService;
import com.lucas.spring.components.folder.service.QueryBuilderService;
import com.lucas.spring.components.folder.service.QueryElementService;
import com.lucas.spring.components.image.model.request.QueryMultiType;
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
    final FolderEntity folder = request.getFolderId() == null
            ? folderService.save(request.getTitle(), request.getDescription(), user)
            : folderService.getFolderById(Long.valueOf(request.getFolderId()));

    request.getQueriedImages().forEach(obj -> {
      final QueryBuilderEntity queryBuilderEntity = this.saveQueryMultiType(obj.getQuery(), null);

      if (queryBuilderEntity == null) {
        throw new QueryBuilderException(QueryBuilderExceptionEnum.QUERY_BUILDER_IS_NULL);
      }

      obj.getImageIds().forEach(imageId ->
              this.folderContentService.save(folder.getId(), imageId, queryBuilderEntity.getId()));
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
