package com.lucas.spring.components.folder.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.model.KeyValueModel;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.folder.enums.FolderExceptionEnum;
import com.lucas.spring.components.folder.exception.FolderException;
import com.lucas.spring.components.folder.facade.FolderContentDataFacade;
import com.lucas.spring.components.folder.facade.FolderFacade;
import com.lucas.spring.components.folder.facade.FolderHelperFacade;
import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.model.FolderContentCreationModel;
import com.lucas.spring.components.folder.model.model.QueriedImages;
import com.lucas.spring.components.folder.model.model.SelectedProcedureLogModel;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;
import com.lucas.spring.components.folder.model.request.FolderImageAdditionRequest;
import com.lucas.spring.components.folder.service.FolderContentService;
import com.lucas.spring.components.folder.service.FolderService;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link FolderFacade}.
 */
@Service
@AllArgsConstructor
public class FolderFacadeImpl implements FolderFacade {
  private final FolderHelperFacade folderHelperFacade;
  private final FolderService folderService;
  private final FolderContentService folderContentService;
  private final FolderContentDataFacade folderContentDataFacade;

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void save(final FolderCreationRequest request, final AuthenticatedUser user) {
    this.saveImages(
            request.getQueriedImages(),
            folderService.save(request.getTitle(), request.getDescription(), user).getId()
    );
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void save(final FolderImageAdditionRequest request, final AuthenticatedUser user) {
    final Long folderId = FormatParseUtil.parseToLong(request.getFolderId());
    final FolderEntity folder = getFolder(folderId, user);
    this.saveImages(request.getQueriedImages(), folder.getId());
    folderHelperFacade.updateFolderModificationTime(folder);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void delete(final Long folderId, final AuthenticatedUser user) {
    final FolderEntity folder = folderHelperFacade.isFolderOwnedByUserElseException(folderId, user);
    this.folderService.delete(folder, user);
    folderHelperFacade.updateFolderModificationTime(folder);
  }

  /**
   * Based on the provided queried images and the folder id, save the images
   * into the folder.
   *
   * @param queriedImages The images to save. It can be an empty list.
   * @param folderId The id of the folder in which we want to save the images.
   */
  private void saveImages(final List<QueriedImages> queriedImages, final Long folderId) {
    final List<FolderContentCreationModel> models = new ArrayList<>();

    queriedImages.forEach(queriedImage -> {
      if (queriedImage.getLogs().isEmpty()) {
        models.add(this.createContentCreationModel(queriedImage.getImageId(), folderId, null));
      } else {
        queriedImage.getLogs().forEach(boundingBoxId ->
                models.add(this.createContentCreationModel(queriedImage.getImageId(), folderId, boundingBoxId))
        );
      }
    });

    // Save the property keys
    final List<List<List<KeyValueModel>>> keyList = queriedImages.stream()
            .map(queriedImage -> queriedImage.getLogs().stream()
                    .map(SelectedProcedureLogModel::getProperties)
                    .toList()
            ).toList();
    this.folderContentDataFacade.save(keyList);

    // Remove the old contents from the database
    this.folderContentService.removeOldContents(models, true);

    // Save the content properties
    models.forEach(model -> {
      final FolderContentEntity entity = this.folderContentService.save(model);

      if (model.getLogModel() == null) {
        return;
      }

      this.folderContentDataFacade.save(entity, model.getLogModel().getProperties());
    });
  }

  private FolderEntity getFolder(final Long folderId, final AuthenticatedUser user) {
    if (folderId == null) {
      throw new FolderException(FolderExceptionEnum.FOLDER_ID_IS_NOT_PROVIDED);
    }

    final FolderEntity folder = folderService.getFolderById(folderId);
    folderHelperFacade.isFolderEditableElseException(folder, user);
    return folderHelperFacade.updateFolderModificationTime(folder);
  }

  private FolderContentCreationModel createContentCreationModel(
          final Long imageId,
          final Long folderId,
          final SelectedProcedureLogModel logModel
  ) {
    return FolderContentCreationModel.builder()
            .imageId(imageId)
            .folderId(folderId)
            .logModel(logModel)
            .build();
  }
}
