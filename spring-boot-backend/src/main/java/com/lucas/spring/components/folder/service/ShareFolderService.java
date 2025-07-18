package com.lucas.spring.components.folder.service;

import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * An interface service for the Share Folder Service.
 */
@Service
public interface ShareFolderService {
  /**
   * Get all shared folders.
   *
   * @param userId The id of the user whose shared folders needs to be fetched.
   * @return Returns all the shared folders of the user.
   */
  List<ShareFolderEntity> getShareFolders(Long userId);
}
