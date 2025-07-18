package com.lucas.spring.commons.helper;

import com.lucas.spring.commons.model.response.PageableResponse;
import java.util.Collection;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/**
 * Defines conversions from type to another type.
 */
@Component
@AllArgsConstructor
public class ConversionHelper {
  private final ConversionService conversionService;
  public static final String PAGEABLE_PROPERTIES = "X-Pageable-Properties";

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
  public final <S, T> PageableResponse<T> convertPage(final Page<S> page, final Class<T> target) {
    final List<T> listOfDto = page.stream().map(source -> this.convert(source, target)).toList();
    return new PageableResponse<>(page, listOfDto);
  }

  /**
   * Convert the requested entities into Dto.
   *
   * @param list The list.
   * @param target The target dto.
   * @param <S> Source class type.
   * @param <T> Target class type.
   * @return Returns the list of type target.
   */
  public final <S, T> List<T> convertList(final Collection<S> list, final Class<T> target) {
    return list.stream().map(source -> this.convert(source, target)).toList();
  }

  /**
   * Convert the requested single entity into single dto.
   *
   * @param source The source to convert.
   * @param target The target dto.
   * @param <S> Source class type.
   * @param <T> Target class type.
   * @return Returns the list of type target.
   */
  public final <S, T> T convert(final S source, final Class<T> target) {
    return conversionService.convert(source, target);
  }
}
