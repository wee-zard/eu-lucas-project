package com.lucas.spring.components.folder.model.request;

import com.lucas.spring.components.folder.model.model.QueriedImages;
import jakarta.validation.constraints.NotNull;
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
public class FolderImageAdditionRequest {
  /**
   * Tells what folder to use to add the images into.
   */
  @NotNull
  private Integer folderId;

  /**
   * The list of images that needs to be saved inside a folder.
   */
  private List<QueriedImages> queriedImages;
}
