package com.lucas.spring.components.folder.model.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Stores what basic modifications has been applied on the selected
 * procedure logs, so they could be displayed differently on
 * the image canvas.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class KeyValueModel {
  private String key;
  private String value;
}
