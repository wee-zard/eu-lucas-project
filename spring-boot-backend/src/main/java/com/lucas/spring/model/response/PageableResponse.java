package com.lucas.spring.model.response;

import java.util.List;

import com.lucas.spring.model.models.PageableProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * A response type that only gives back a portion of the
 * result query based on the provided page number, and page size.
 */
@Getter
@AllArgsConstructor
public class PageableResponse<T> {
  /**
   * The properties of the Pageable response.
   */
  private PageableProperties properties;

  /**
   * The list of items that is sent back to the requester.
   */
  private List<T> pageItems;
}
