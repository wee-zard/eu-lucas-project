package com.lucas.spring.helper.helper;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.response.PageableResponse;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.util.Streamable;
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
   * @param pageableProperties The properties of the Page.
   * @param <S> Source class type.
   * @param <T> Target class type.
   * @return Returns a {@link PageableResponse} that hold the
   *     items and the {@link PageableProperties} in a single object.
   */
  public final <S, T extends RootDto> PageableResponse<T> pageToPageableResponse(
          final Streamable<S> page,
          final Class<T> target,
          final PageableProperties pageableProperties
  ) {
    final List<T> listOfDto = page
            .stream()
            .map(source -> conversionService.convert(source, target))
            .toList();
    return new PageableResponse<>(pageableProperties, listOfDto);
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
  public final <S, T extends RootDto> List<T> convertEntityToDto(
          final List<S> list,
          final Class<T> target
  ) {
    return list.stream().map(source -> conversionService.convert(source, target)).toList();
  }
}
