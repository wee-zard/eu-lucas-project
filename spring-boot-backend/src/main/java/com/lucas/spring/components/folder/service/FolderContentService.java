package com.lucas.spring.components.folder.service;

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
}
