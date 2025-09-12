package com.lucas.spring.components.folder.facade;

import com.lucas.spring.commons.model.model.KeyValueModel;
import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import java.util.List;

/**
 * An interface service for the Folders Content Data Facade.
 */
public interface FolderContentDataFacade {

  /**
   * Saves the list of properties in the key table.
   *
   * @param properties The properties of the content.
   */
  void save(List<List<List<KeyValueModel>>> properties);

  /**
   * Saves the provided properties of the content.
   *
   * @param content The folder content.
   * @param properties The properties of the content.
   */
  void save(FolderContentEntity content, List<KeyValueModel> properties);
}
