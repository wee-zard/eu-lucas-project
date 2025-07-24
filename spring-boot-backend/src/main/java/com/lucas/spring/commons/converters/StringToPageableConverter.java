package com.lucas.spring.commons.converters;

import com.lucas.spring.commons.enums.ConversionExceptionEnum;
import com.lucas.spring.commons.exception.ConversionException;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.commons.utils.PageablePropertiesUtil;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link String} to {@link Pageable}.
 */
@Component
public class StringToPageableConverter implements Converter<String, Pageable> {

  private static final String PAGE_SIZE = "pageSize";
  private static final String PAGE_NO = "pageNo";
  private static final String PAGE_FIELD = "field";
  private static final String PAGE_SORT = "sort";

  /**
   * {@inheritDoc}
   */
  @Override
  public Pageable convert(final @NonNull String source) {
    final Map<String, String> pageablePropertiesMap = getPageablePropertiesMap(source);

    // Checking if exact properties are present or not.
    if (pageablePropertiesMap.get(PAGE_NO).isEmpty()) {
      throw new ConversionException(ConversionExceptionEnum.PAGE_NO_IS_NOT_PROVIDED);
    }

    if (pageablePropertiesMap.get(PAGE_SIZE).isEmpty()) {
      throw new ConversionException(ConversionExceptionEnum.PAGE_SIZE_IS_NOT_PROVIDED);
    }

    final Integer pageNo = pagePropertiesToInteger(pageablePropertiesMap, PAGE_NO);
    final Integer pageSize = pagePropertiesToInteger(pageablePropertiesMap, PAGE_SIZE);
    final String field = pagePropertiesToString(pageablePropertiesMap, PAGE_FIELD);
    final String sort = pagePropertiesToString(pageablePropertiesMap, PAGE_SORT);

    if (pageNo < 0) {
      throw new ConversionException(ConversionExceptionEnum.PAGE_NO_CANNOT_BE_NEGATIVE);
    }

    if (pageSize < 0) {
      throw new ConversionException(ConversionExceptionEnum.PAGE_SIZE_CANNOT_BE_NEGATIVE);
    }

    return PageablePropertiesUtil.create(pageNo, pageSize, field, sort);
  }

  /**
   * Fetches an entry from the map and convert it into an integer.
   *
   * @param pageablePropertiesMap The map that hold the pageable property key-value pairs.
   * @param property The property key to fetch from the map.
   * @return Returns the value of the key in integer format.
   */
  private Integer pagePropertiesToInteger(
          final Map<String, String> pageablePropertiesMap,
          final String property) {
    return FormatParseUtil.parseStringIntoNumber(pageablePropertiesMap.get(property));
  }

  /**
   * Fetches an entry from the map and convert it into a string.
   *
   * @param pageablePropertiesMap The map that hold the pageable property key-value pairs.
   * @param property The property key to fetch from the map.
   * @return Returns the value of the key in integer format.
   */
  private String pagePropertiesToString(
          final Map<String, String> pageablePropertiesMap,
          final String property) {
    final Optional<String> nullable = Optional.ofNullable(pageablePropertiesMap.get(property));
    return nullable.orElse(null);
  }

  /**
   * Fetches all the pageable properties from the header
   * and put them into a map where the key is the name of the property, and the value
   * is the value associated to the property key.
   *
   * @param source The source string that should contain the pageable properties.
   * @return Returns a map that holds the pageable properties in a key-value pair.
   */
  private Map<String, String> getPageablePropertiesMap(final String source) {
    if (source.isEmpty()) {
      throw new ConversionException(ConversionExceptionEnum.PAGEABLE_PROPERTIES_ARE_NOT_DEFINED);
    }

    // Properties must contain a ";" character to separate the properties from each other.
    if (!source.contains(";")) {
      throw new ConversionException(ConversionExceptionEnum.PAGEABLE_PROPERTIES_INVALID_FORMAT);
    }

    // Init all the pageable properties that is present in the request header.
    final String[] properties = source.split(";");
    final Map<String, String> pageablePropertiesMap = new HashMap<>();

    for (final String property : properties) {
      if (!property.contains("=")) {
        throw new ConversionException(ConversionExceptionEnum.PAGEABLE_PROPERTIES_INVALID_FORMAT);
      }

      final String[] splitProperty = property.split("=");
      pageablePropertiesMap.put(splitProperty[0], splitProperty[1]);
    }

    return pageablePropertiesMap;
  }
}
