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
   * Removes the old folder content from the db if they are existing in the param.
   *
   * @param models The list of models to check if they are exists in the folder.
   *               If yes, then remove them from the db.
   */
  void removeOldContents(List<FolderContentCreationModel> models);

  /**
   * Save the provided model in the folder content.
   *
   * @param model The model to save.
   */
  FolderContentEntity save(FolderContentCreationModel model);

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
