package com.lucas.spring.components.folder.model.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * A model that describes a folder form.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class FolderFormWithFolderIdModel extends FolderFormModel {
  /**
   * Tells what folder to use to add the images into.
   */
  @NotNull
  private Integer folderId;
}
