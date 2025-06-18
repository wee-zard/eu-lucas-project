package com.lucas.spring.services.facade;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.folder.FolderCreationRequest;

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
}
