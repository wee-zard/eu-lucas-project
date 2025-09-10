package com.lucas.spring.components.folder.model.request;

import com.lucas.spring.components.folder.model.model.FolderFormModel;
import com.lucas.spring.components.folder.model.model.QueriedImages;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * A model that describes a newly created folder of the user.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FolderCreationRequest extends FolderFormModel {

  /**
   * The list of images that needs to be saved inside a folder.
   */
  private List<QueriedImages> queriedImages;
}
