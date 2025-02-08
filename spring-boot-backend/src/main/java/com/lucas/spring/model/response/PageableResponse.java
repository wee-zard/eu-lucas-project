package com.lucas.spring.model.response;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.models.PageableProperties;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * A response type that only gives back a portion of the
 * result query based on the provided page number, and page size.
 */
@Getter
@AllArgsConstructor
public class PageableResponse<T extends RootDto> {
  /**
   * The properties of the Pageable response.
   */
  private PageableProperties properties;

  /**
   * The list of items that is sent back to the requester.
   */
  private List<T> pageItems;
}
