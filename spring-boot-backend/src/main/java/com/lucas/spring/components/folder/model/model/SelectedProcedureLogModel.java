package com.lucas.spring.components.folder.model.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Stores the selected procedure logs, and the properties what the
 * users applied on the bounding boxes.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SelectedProcedureLogModel {
  private Long logId;
  private List<KeyValueModel> properties;
}
