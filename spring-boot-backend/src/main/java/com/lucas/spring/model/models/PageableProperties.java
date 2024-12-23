package com.lucas.spring.model.models;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * Stores the properties of the Pageable response,
 * such as which page should be give back, and stores
 * the number of items to give back.
 */
@Builder
@ToString
@Getter
public class PageableProperties {
  /**
   * The currently active page.
   */
  private final Integer pageNo;

  /**
   * The size of the page (this is the pagination).
   */
  private final Integer pageSize;
}
