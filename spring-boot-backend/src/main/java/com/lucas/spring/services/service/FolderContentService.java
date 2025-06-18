package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.FolderContentEntity;
import org.springframework.stereotype.Service;

/**
 * Service of the Folder Content Entity.
 */
@Service
public interface FolderContentService {

  /**
   * Saves the provided entity.
   *
   * @param folderId The id of the folder.
   * @param imageId The id of the image to add to the folder.
   * @param queryId The id of the query that fetched the images.
   */
  void save(Long folderId, Long imageId, Long queryId);
}
