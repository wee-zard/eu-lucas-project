package com.lucas.spring.model.request.folder;

import com.lucas.spring.model.request.filtering.FilteringQueryRequest;
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
   * The list of image ids that has been queried by the Query Builder.
   */
  private List<Number> imageIds;

  /**
   * The query that has been constructed and created by the user
   * to filter the images from the server.
   */
  private FilteringQueryRequest query;
}
