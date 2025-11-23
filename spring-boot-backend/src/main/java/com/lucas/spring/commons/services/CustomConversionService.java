package com.lucas.spring.commons.services;

import com.lucas.spring.commons.model.response.PageableResponse;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Defines an interface that will handle the conversions from
 * one type to another type.
 */
public interface CustomConversionService {
  /**
   * Convert the requested entities into {@link PageableResponse}.
   *
   * @param page The streamable that holds the different entities that needs to be converted.
   * @param target The type of dto which the source object must be converted into.
   * @param <S> Source class type.
   * @param <T> Target class type.
   * @return Returns a {@link PageableResponse} that hold the
   *     items and the {@link Pageable} in a single object.
   */
  <S, T> PageableResponse<T> convert(final Page<S> page, final Class<T> target);

  /**
   * Convert the requested entities into Dto list.
   *
   * @param list The list.
   * @param target The target dto.
   * @param <S> Source class type.
   * @param <T> Target class type.
   * @return Returns the list of type target.
   */
  <S, T> List<T> convert(final List<S> list, final Class<T> target);

  /**
   * Convert the requested single entity into single dto.
   *
   * @param source The source to convert.
   * @param target The target dto.
   * @param <S> Source class type.
   * @param <T> Target class type.
   * @return Returns the list of type target.
   */
  <S, T> T convert(final S source, final Class<T> target);
}
