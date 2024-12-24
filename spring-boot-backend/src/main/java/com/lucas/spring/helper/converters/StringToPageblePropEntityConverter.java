package com.lucas.spring.helper.converters;

import com.lucas.spring.model.models.PageableProperties;
import java.util.HashMap;
import java.util.Map;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link String} to {@link PageableProperties}.
 */
@Component
public class StringToPageblePropEntityConverter
        implements Converter<String, PageableProperties> {

  private static final String PAGE_SIZE = "pageSize";
  private static final String PAGE_NO = "pageNO";

  /**
   * {@inheritDoc}
   */
  @Override
  public PageableProperties convert(final String source) {
    final Map<String, String> pageablePropertiesMap = getPageablePropertiesMap(source);

    // Checking if exact properties are present or not.
    if (pageablePropertiesMap.get(PAGE_NO).isEmpty()) {
      throw new RuntimeException("pageNo is not provided in the Pageable Properties!");
    }
    if (pageablePropertiesMap.get(PAGE_SIZE).isEmpty()) {
      throw new RuntimeException("pageSize is not provided in the Pageable Properties!");
    }
    try {
      return PageableProperties
                .builder()
                .pageNo(Integer.parseInt(pageablePropertiesMap.get(PAGE_NO)))
                .pageSize(Integer.parseInt(pageablePropertiesMap.get(PAGE_SIZE)))
                .build();
    } catch (Throwable error) {
      throw new RuntimeException("Error why executing the build of PageableProperties! "
                + error.getMessage());
    }
  }

  private Map<String, String> getPageablePropertiesMap(String source) {
    if (source.isEmpty()) {
      throw new RuntimeException("Pageable Properties are not defined!");
    }
    // Properties must contain a ";" character to separate the properties from each other.
    if (source.contains(";")) {
      throw new RuntimeException("Pageable Properties format is invalid!");
    }
    // Init all the pageable properties that is present in the request header.
    final String[] properties = source.split(";");
    final Map<String, String> pageablePropertiesMap = new HashMap<>();
    for (final String property : properties) {
      if (property.contains("=")) {
        throw new RuntimeException("Pageable Properties format is invalid!");
      }
      final String[] splitProperty = property.split("=");
      pageablePropertiesMap.put(splitProperty[0], splitProperty[1]);
    }
    return pageablePropertiesMap;
  }
}
