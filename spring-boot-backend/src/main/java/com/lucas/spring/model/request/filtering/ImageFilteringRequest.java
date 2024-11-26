package com.lucas.spring.model.request.filtering;

import java.util.ArrayList;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Store the active filter values that must be
 * applied onto the image table to filter them.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class ImageFilteringRequest {
  /**
   * The filtering groups which must be applied on the images.
   */
  private ArrayList<FilterFormGroup> filterFormGroups;

  /**
   * Relationships between the filterFormGroups.
   */
  private FilterFormRelation relations;
}
