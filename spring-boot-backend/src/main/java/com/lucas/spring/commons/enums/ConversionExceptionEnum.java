package com.lucas.spring.commons.enums;

/**
 * Exceptions enums that could be thrown during the conversions.
 */
public enum ConversionExceptionEnum {
  PAGE_NO_IS_NOT_PROVIDED,
  PAGE_NO_CANNOT_BE_NEGATIVE,
  PAGE_SIZE_IS_NOT_PROVIDED,
  PAGE_SIZE_CANNOT_BE_NEGATIVE,
  PAGEABLE_PROPERTIES_ARE_NOT_DEFINED,
  PAGEABLE_PROPERTIES_INVALID_FORMAT,
}
