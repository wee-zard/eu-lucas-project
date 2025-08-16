package com.lucas.spring.components.folder.service;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.folder.model.dto.FolderDtoSlice;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
  List<FolderEntity> getFoldersByUserId(Long userId);

  /**
   * Get folders of the current pageable.
   *
   * @param userId The id of the user whose folder we want to fetch.
   * @param pageable The pageable properties.
   * @return Returns all the folders of the user.
   */
  Page<FolderDtoSlice> getFoldersByUserId(Long userId, Pageable pageable);

  /**
   * Fetches all the user's folders folder names and their ids sorted by the
   * 'updatedAt' property of the entity.
   *
   * @param userId The id of the user whose folder we want to fetch.
   * @return Returns the list of all folders under the user sorted by the 'updatedAt' property.
   */
  List<FolderDtoSlice> getAllSortedFoldersByUserId(Long userId);

  /**
   * Get a specific folder by their id.
   *
   * @param folderId The id of the folder.
   * @return Returns a folder.
   */
  FolderEntity getFolderById(Long folderId);

  /**
   * Checks whether the provided folder title exists under the user.
   *
   * @param title The title to check.
   * @param user The user to check.
   * @return Returns true if the folder under the user does not exist, else false.
   */
  boolean isFolderExistsByUser(String title, AuthenticatedUser user);

  /**
   * Deletes a provided folder by their id.
   *
   * @param folder The folder entity to delete.
   * @param user The user who initiated the request.
   */
  void delete(FolderEntity folder, AuthenticatedUser user);

  /**
   * Checks whether the user is the owner of the given folder.
   *
   * @param folder The folder to check.
   * @param user The user to check.
   * @return Returns true if the folder is the provided user's own.
   */
  boolean isUserOwnerOfFolder(FolderEntity folder, AuthenticatedUser user);
}
