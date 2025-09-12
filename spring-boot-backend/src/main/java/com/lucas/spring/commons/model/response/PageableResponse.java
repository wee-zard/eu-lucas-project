package com.lucas.spring.commons.model.response;

import java.util.Collection;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * A response type that only gives back a portion of the
 * result query based on the provided page number, and page size.
 */
@Data
@NoArgsConstructor
public class PageableResponse<T> {
  private Collection<T> content;
  private Integer totalPages;
  private long totalElements;
  private Integer size;
  private Integer page;
  private boolean empty;

  /**
   * Constructs a {@link PageableResponse} instance.
   */
  public PageableResponse(
          final Collection<T> content,
          final Pageable pageable,
          final Long totalElements,
          final int totalPages
  ) {
    this.content = content;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
    this.size = pageable.getPageSize();
    this.page = pageable.getPageNumber();
    this.empty = content.isEmpty();
  }

  /**
   * Constructs a {@link PageableResponse} instance.
   *
   * @param page The page containing the entities.
   * @param content The content that must be returned.
   */
  public PageableResponse(final Page<?> page, final Collection<T> content) {
    this.content = content;
    this.totalPages = page.getTotalPages();
    this.totalElements = page.getTotalElements();
    this.size = page.getSize();
    this.page = page.getNumber();
    this.empty = page.isEmpty();
  }
}
