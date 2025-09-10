package com.lucas.spring.components.folder.service;

import com.lucas.spring.components.folder.model.entity.FolderContentDataEntity;
import java.util.List;

/**
 * Service.
 */
public interface FolderContentDataService {

  /**
   * Saves the provided entities.
   *
   * @param entities The entities to save.
   */
  void saveAll(List<FolderContentDataEntity> entities);
}
