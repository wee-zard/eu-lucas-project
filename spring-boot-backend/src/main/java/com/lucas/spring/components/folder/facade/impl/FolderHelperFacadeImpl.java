package com.lucas.spring.components.folder.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.authorization.enums.AuthorizationExceptionEnum;
import com.lucas.spring.components.authorization.exception.AuthorizationException;
import com.lucas.spring.components.folder.enums.FolderExceptionEnum;
import com.lucas.spring.components.folder.exception.FolderException;
import com.lucas.spring.components.folder.facade.FolderHelperFacade;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import com.lucas.spring.components.folder.service.FolderService;
import com.lucas.spring.components.folder.service.ShareFolderService;
import java.time.Instant;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Facade implementation.
 */
@Service
@AllArgsConstructor
public class FolderHelperFacadeImpl implements FolderHelperFacade {
  private final FolderService folderService;
  private final ShareFolderService shareFolderService;

  /**
   * {@inheritDoc}
   */
  @Override
  public void isFolderEditableElseException(final FolderEntity folder, final AuthenticatedUser user) {
    if (this.folderService.isUserOwnerOfFolder(folder, user)) {
      return;
    }

    final Optional<ShareFolderEntity> sharedFolder =
            shareFolderService.getSharedFolderByIdByUser(folder.getId(), user.getUserId());

    final boolean isEditable = sharedFolder.isPresent() && sharedFolder.get().getIsEditable();

    if (!isEditable) {
      throw new FolderException(FolderExceptionEnum.FOLDER_NO_WRITE_RIGHTS, folder.getId());
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void isFolderEditableElseException(final Long folderId, final AuthenticatedUser user) {
    this.isFolderEditableElseException(folderService.getFolderById(folderId), user);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity isFolderOwnedByUserElseException(
          final Long folderId,
          final AuthenticatedUser user
  ) {
    final FolderEntity folder = this.folderService.getFolderById(folderId);

    if (!this.folderService.isUserOwnerOfFolder(folder, user)) {
      throw new AuthorizationException(AuthorizationExceptionEnum.PERMISSION_DENIED);
    }

    return folder;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity updateFolderModificationTime(final FolderEntity folder) {
    folder.setUpdatedAt(Instant.now());
    folderService.save(folder);
    return folder;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity updateFolderModificationTime(final Long folderId) {
    return updateFolderModificationTime(folderService.getFolderById(folderId));
  }
}
