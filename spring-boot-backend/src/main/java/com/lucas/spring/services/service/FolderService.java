package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.FolderEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.folder.FolderCreationRequest;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * An interface service for the Folders.
 */
@Service
public interface FolderService {

  /**
   * Saves a folder.
   *
   * @param folderEntity The entity to save.
   */
  FolderEntity save(FolderEntity folderEntity);

  /**
   * Saves a folder.
   *
   * @param title The title of the folder.
   * @param description The description added to the folder.
   * @param user The user who initiated the request.
   */
  FolderEntity save(String title, String description, AuthenticatedUser user);

  /**
   * Get all folders.
   *
   * @return Returns all the folders of the user.
   */
  List<FolderEntity> getFolders(Long userId);

  /**
   * Get a specific folder by their id.
   *
   * @param folderId The id of the folder.
   * @return Returns a folder.
   */
  FolderEntity getFolderById(Long folderId) throws RuntimeException;

  /**
   * Checks whether the provided folder title exists under the user.
   *
   * @param title The title to check.
   * @param user The user to check.
   * @return Returns true if the folder under the user does not exist, else false.
   */
  boolean isFolderExistsByUser(String title, AuthenticatedUser user);
}
