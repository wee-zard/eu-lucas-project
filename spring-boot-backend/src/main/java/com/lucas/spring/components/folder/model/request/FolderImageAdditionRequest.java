package com.lucas.spring.components.folder.model.request;

import com.lucas.spring.components.folder.model.model.FolderFormWithFolderIdModel;
import com.lucas.spring.components.folder.model.model.QueriedImages;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * A model that describes a model where images should be
 * added to a specific folder.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FolderImageAdditionRequest extends FolderFormWithFolderIdModel {

  /**
   * The list of images that needs to be saved inside a folder.
   */
  private List<QueriedImages> queriedImages;
}
