package com.lucas.spring.components.folder.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.authorization.exception.AuthorizationException;
import com.lucas.spring.components.folder.model.entity.FolderEntity;

/**
 * An interface for the common methods and implementations that
 * should be accessed to other facades inside the /folder directory.
 */
public interface FolderHelperFacade {

  /**
   * Checks whether the provided user has access to edit the provided folder or
   * not based on the folder's permissions. If the folder is the user's own
   * property, then this permission is granted, else if the folder is shared
   * with the user, then we are checking if the user has 'editing' rights
   * on the specific folder.
   *
   * @param folder The folder to check.
   * @param user   The user who initiated the request.
   */
  void isFolderEditableElseException(FolderEntity folder, AuthenticatedUser user);

  /**
   * Checks whether the provided user has access to edit the provided folder or
   * not based on the folder's permissions. If the folder is the user's own
   * property, then this permission is granted, else if the folder is shared
   * with the user, then we are checking if the user has 'editing' rights
   * on the specific folder.
   *
   * @param folderId The id of the folder to check.
   * @param user     The user who initiated the request.
   */
  void isFolderEditableElseException(Long folderId, AuthenticatedUser user);

  /**
   * Checks whether the provided user has an owner rights on the given folder.
   *
   * @param folderId The id of the folder to check.
   * @param user The user who initiated the request.
   * @return Returns a {@link FolderEntity} if the user has access to the folder,
   *     else throws a {@link AuthorizationException} exception.
   */
  FolderEntity isFolderOwnedByUserElseException(Long folderId, AuthenticatedUser user);

  /**
   * Updates the modification time of the folder.
   *
   * @param folder The folder to update.
   */
  FolderEntity updateFolderModificationTime(FolderEntity folder);

  /**
   * Updates the modification time of the folder.
   *
   * @param folderId The id of the folder.
   */
  FolderEntity updateFolderModificationTime(Long folderId);

}
