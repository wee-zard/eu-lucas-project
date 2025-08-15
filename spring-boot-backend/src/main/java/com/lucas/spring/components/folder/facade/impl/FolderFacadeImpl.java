package com.lucas.spring.components.folder.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.folder.enums.FolderExceptionEnum;
import com.lucas.spring.components.folder.exception.FolderException;
import com.lucas.spring.components.folder.facade.FolderFacade;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import com.lucas.spring.components.folder.model.model.FolderContentCreationModel;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;
import com.lucas.spring.components.folder.model.request.FolderImageAdditionRequest;
import com.lucas.spring.components.folder.model.request.QueriedImages;
import com.lucas.spring.components.folder.service.FolderContentService;
import com.lucas.spring.components.folder.service.FolderService;
import com.lucas.spring.components.folder.service.ShareFolderService;
import jakarta.transaction.Transactional;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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
  private final FolderContentService folderContentService;

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
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isFolderEditable(final FolderEntity folder, final AuthenticatedUser user) {
    if (Objects.equals(folder.getOwner().getId(), user.getUserId())) {
      // In this case, the user own the folder.
      return true;
    }

    final Optional<ShareFolderEntity> sharedFolder =
            shareFolderService.getSharedFolderByIdByUser(folder.getId(), user.getUserId());

    return sharedFolder.isPresent() && sharedFolder.get().getIsEditable();
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
      if (queriedImage.getBoundingBoxIds().isEmpty()) {
        models.add(this.createContentCreationModel(queriedImage.getImageId(), folderId, null));
      } else {
        queriedImage.getBoundingBoxIds().forEach(boundingBoxId ->
                models.add(this.createContentCreationModel(queriedImage.getImageId(), folderId, boundingBoxId))
        );
      }
    });

    this.folderContentService.saveAll(models);
  }

  private FolderEntity getFolder(final Long folderId, final AuthenticatedUser user) {
    if (folderId == null) {
      throw new FolderException(FolderExceptionEnum.FOLDER_ID_IS_NOT_PROVIDED);
    }

    final FolderEntity folder = folderService.getFolderById(folderId);

    if (!this.isFolderEditable(folder, user)) {
      throw new FolderException(FolderExceptionEnum.FOLDER_NO_WRITE_RIGHTS, folder.getId());
    }

    folder.setUpdatedAt(Instant.now());
    folderService.save(folder);
    return folder;
  }

  private FolderContentCreationModel createContentCreationModel(
          final Long imageId,
          final Long folderId,
          final Long boundingBoxId
  ) {
    return FolderContentCreationModel.builder()
            .imageId(imageId)
            .folderId(folderId)
            .boundingBoxId(boundingBoxId)
            .build();
  }
}
