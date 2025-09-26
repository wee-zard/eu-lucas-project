package com.lucas.spring.components.folder.service;

import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import java.util.List;
import java.util.Optional;

/**
 * An interface service for the Share Folder Service.
 */
public interface ShareFolderService {
  /**
   * Get all shared folders.
   *
   * @param userId The id of the user whose shared folders needs to be fetched.
   * @return Returns all the shared folders of the user.
   */
  List<ShareFolderEntity> getShareFolders(Long userId);

  /**
   * Gets a specific shared folder by id.
   *
   * @param id     The id of the folder.
   * @param userId The id of the user.
   * @return Returns the shared folder entity.
   */
  Optional<ShareFolderEntity> getSharedFolderByIdByUser(Long id, Long userId);
}
