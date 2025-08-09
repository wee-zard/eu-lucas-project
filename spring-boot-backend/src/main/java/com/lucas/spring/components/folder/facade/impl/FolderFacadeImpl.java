package com.lucas.spring.components.folder.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.folder.enums.FolderExceptionEnum;
import com.lucas.spring.components.folder.enums.QueryBuilderExceptionEnum;
import com.lucas.spring.components.folder.exception.FolderException;
import com.lucas.spring.components.folder.exception.QueryBuilderException;
import com.lucas.spring.components.folder.facade.FolderFacade;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.entity.QueryBuilderEntity;
import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;
import com.lucas.spring.components.folder.service.*;
import com.lucas.spring.components.image.model.request.QueryMultiType;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link FolderFacade}.
 */
@Service
@AllArgsConstructor
public class FolderFacadeImpl implements FolderFacade {
  private final FolderService folderService;
  private final ShareFolderService shareFolderService;
  private final QueryBuilderService queryBuilderService;
  private final QueryElementService queryElementService;
  private final FolderContentService folderContentService;

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void save(final FolderCreationRequest request, final AuthenticatedUser user) {
    final FolderEntity folder = getFolder(request, user);

    request.getQueriedImages().forEach(obj -> {
      final QueryBuilderEntity queryBuilderEntity = this.saveQueryMultiType(obj.getQuery(), null);

      if (queryBuilderEntity == null) {
        throw new QueryBuilderException(QueryBuilderExceptionEnum.QUERY_BUILDER_IS_NULL);
      }

      obj.getImageIds().forEach(imageId ->
              this.folderContentService.save(folder.getId(), imageId, queryBuilderEntity.getId()));
    });
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isFolderEditable(final FolderEntity folder, final AuthenticatedUser user) {
    if (folder.getOwner().getId().equals(user.getUserId())) {
      // In this case, the user own the folder.
      return true;
    }

    final Optional<ShareFolderEntity> sharedFolder =
            shareFolderService.getSharedFolderByIdByUser(folder.getId(), user.getUserId());

    return sharedFolder.isPresent() && sharedFolder.get().getIsEditable();
  }

  private FolderEntity getFolder(
          final FolderCreationRequest request,
          final AuthenticatedUser user
  ) {
    if (request.getFolderId() == null) {
      return folderService.save(request.getTitle(), request.getDescription(), user);
    } else {
      final FolderEntity folder = folderService.getFolderById(Long.valueOf(request.getFolderId()));

      if (this.isFolderEditable(folder, user)) {
        throw new FolderException(FolderExceptionEnum.FOLDER_NO_WRITE_RIGHTS, folder.getId());
      }

      folder.setUpdatedAt(Instant.now());
      folderService.save(folder);
      return folder;
    }
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
