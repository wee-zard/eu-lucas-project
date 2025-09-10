package com.lucas.spring.components.folder.service;

import com.lucas.spring.components.folder.model.entity.FolderContentKeyEntity;
import java.util.List;

/**
 * Service for the Folder content data keys.
 */
public interface FolderContentKeyService {

  /**
   * List all keys from the table.
   *
   * @return Returns a list of entities.
   */
  List<FolderContentKeyEntity> listAll();

  /**
   * Saves the provided keys.
   *
   * @param keys The keys to save.
   */
  void save(List<String> keys);
}
