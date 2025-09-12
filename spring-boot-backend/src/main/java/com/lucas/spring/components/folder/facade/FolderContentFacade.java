package com.lucas.spring.components.folder.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.components.folder.model.dto.FolderContentDto;
import org.springframework.data.domain.Pageable;

/**
 * Facade for the folder content service.
 */
public interface FolderContentFacade {

  /**
   * Get the content of the folder by a folder id.
   *
   * @param folderId The id of the folder from which the content will be returned.
   * @param user The user who initiated the request.
   * @param pageable The pageable to control the number of fetched content
   *                 from the folder.
   */
  PageableResponse<FolderContentDto> findAllByFolderId(
          String folderId, AuthenticatedUser user, Pageable pageable);

  /**
   * Removes a specific image from a specific folder.
   *
   * @param folderId The id of the folder that will be modified.
   * @param imageId The id of the image that will be removed from the folder.
   * @param user The user who initiated the request.
   */
  void delete(Long folderId, Long imageId, AuthenticatedUser user);

  /**
   * Clears the content of the provided folder.
   *
   * @param folderId The id of the folder.
   */
  void clearFolderContent(Long folderId, AuthenticatedUser user);
}
