package com.lucas.spring.commons.utils;

import lombok.experimental.UtilityClass;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

/**
 * A utility class for creating {@link Pageable} objects.
 */
@UtilityClass
public class PageablePropertiesUtil {

  /**
   * Creates a new {@link Pageable} instance.
   *
   * @param page The current page.
   * @param size The number of items on the page.
   * @return Returns a new {@link Pageable} instance based on the provided params.
   */
  public Pageable create(final Integer page, final Integer size) {
    return PageRequest.of(page, size);
  }

  /**
   * Creates a new {@link Pageable} instance.
   *
   * @param page The current page.
   * @param size The number of items on the page.
   * @param direction The sorting direction. It can be 'asc', or 'desc'.
   * @param sortField The attribute in which we want the sort ot happen.
   * @return Returns a new {@link Pageable} instance based on the provided params.
   */
  public Pageable create(
          final Integer page,
          final Integer size,
          final String direction,
          final String sortField
  ) {
    return sortField == null || direction == null
            ? PageablePropertiesUtil.create(page, size)
            : PageRequest.of(page, size, Sort.Direction.fromString(sortField), direction);
  }
}




