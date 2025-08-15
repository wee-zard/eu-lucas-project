package com.lucas.spring.components.folder.model.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Stores the images that has been fetched by a specific query.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class QueriedImages {
  /**
   * The id of the image that has been queried by the Query Builder.
   */
  private Long imageId;

  /**
   * The ids of the bounding boxes that has been applied on the selected image.
   */
  private List<Long> boundingBoxIds;
}
