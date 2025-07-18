package com.lucas.spring.components.folder.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.folder.model.request.FolderCreationRequest;

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
   * Fetch the folders which the user has access to meaning that
   * this method will fetch the owner's folders, and those folders
   * that have been shared with the user.
   *
   * @param user The user whose folder will be returned.
   */
  void getUserFolders(AuthenticatedUser user);
}
