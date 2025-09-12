package com.lucas.spring.components.folder.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
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
   * Deletes a provided folder by their id.
   *
   * @param folderId The id of the folder.
   * @param user The user who initiated the request.
   */
  void delete(Long folderId, AuthenticatedUser user);
}
