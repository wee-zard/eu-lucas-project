package com.lucas.spring.components.folder.model.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * A model that describes the creation of a new folder content entity.
 */
@Builder
@Getter
@AllArgsConstructor
public class FolderContentCreationModel {
  private Long folderId;
  private Long imageId;
  private SelectedProcedureLogModel logModel;
}
