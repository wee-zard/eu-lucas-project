package com.lucas.spring.components.folder.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;
import com.lucas.spring.components.folder.model.request.FolderImageAdditionRequest;

/**
 * An interface service for the Folders Facade.
 */
public interface FolderFacade {

  /**
   * Creates a new folder based on the provided request, add the
   * images to the folder, and append the queries.
   *
   * @param request The request to save.
   * @param user The user who initiated the request.
   */
  void save(FolderCreationRequest request, AuthenticatedUser user);

  /**
   * Add images to an already existing folder based on the provided request.
   *
   * @param request The request to save.
   * @param user The user who initiated the request.
   */
  void save(FolderImageAdditionRequest request, AuthenticatedUser user);

  /**
   * Checks whether the provided user has access to edit the provided folder or
   * not based on the folder's permissions. If the folder is the user's own
   * property, then this permission is granted, else if the folder is shared
   * with the user, then we are checking if the user has 'editing' rights
   * on the specific folder.
   *
   * @param folder The folder to check.
   * @param user The user who initiated the request.
   * @return Returns true if the user has rights to edit the folder, else false.
   */
  boolean isFolderEditable(FolderEntity folder, AuthenticatedUser user);
}
