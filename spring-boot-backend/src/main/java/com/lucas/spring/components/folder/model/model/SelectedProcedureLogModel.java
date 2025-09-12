package com.lucas.spring.components.folder.model.model;

import com.lucas.spring.commons.model.model.KeyValueModel;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Stores the selected procedure logs, and the properties what the
 * users applied on the bounding boxes.
 */
@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SelectedProcedureLogModel {
  private Long logId;
  private List<KeyValueModel> properties;
}
