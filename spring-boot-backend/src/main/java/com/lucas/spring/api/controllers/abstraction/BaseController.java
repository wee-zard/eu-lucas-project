package com.lucas.spring.api.controllers.abstraction;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.response.PageableResponse;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;

/**
 * A base controller that is defines a conversion between table entities to dto.
 * The dto is a pageable response dto.
 */
@AllArgsConstructor
public abstract class BaseController {
  public ConversionService conversionService;

  /**
   * Convert the requested entities into {@link PageableResponse}.
   *
   * @param page The page that holds the different entities that needs to be converted.
   * @param target The type of dto which the source object must be converted into.
   * @param pageableProperties The properties of the Page.
   * @param <S> Source class type.
   * @param <T> Target class type.
   * @return Returns a {@link PageableResponse} that hold the
   *     items and the {@link PageableProperties} in a single object.
   */
  public final <S, T extends RootDto> PageableResponse<T> pageToPageableResponse(
          final Page<S> page,
          final Class<T> target,
          final PageableProperties pageableProperties
  ) {
    final List<T> listOfDto = page
            .stream()
            .map(source -> conversionService.convert(source, target))
            .toList();
    return new PageableResponse<>(pageableProperties, listOfDto);
  }
}
