package com.lucas.spring.components.folder.service;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.model.FolderContentCreationModel;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Service of the Folder Content Entity.
 */
@Service
public interface FolderContentService {

  /**
   * Save all the provided models in the folder content.
   *
   * @param models The models to save.
   */
  void saveAll(List<FolderContentCreationModel> models);

  /**
   * Find all the folder contents by a given folder id.
   *
   * @param folderId The id of the folder.
   * @return Returns a list of folder contents.
   */
  List<FolderContentEntity> findAllByFolderId(Long folderId);

  /**
   * Clear the content of the provided folder.
   *
   * @param folderId The id of the folder.
   */
  void clearFolder(Long folderId);
}
