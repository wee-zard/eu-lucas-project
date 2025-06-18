package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.FolderEntity;
import java.util.List;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.folder.FolderCreationRequest;
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
  void save(FolderEntity folderEntity);

  /**
   * Saves a folder.
   *
   * @param request The request to save.
   * @param user The user who initiated the request.
   */
  void save(FolderCreationRequest request, AuthenticatedUser user);

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
}
