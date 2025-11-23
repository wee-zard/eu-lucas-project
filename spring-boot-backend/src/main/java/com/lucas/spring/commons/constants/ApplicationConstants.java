package com.lucas.spring.commons.constants;

import lombok.experimental.UtilityClass;

/**
 * A class that holds the constants values of the application.
 */
@UtilityClass
public class ApplicationConstants {
  /**
   * Tells the name of the pageable properties that should be displayed
   * on the http request's header.
   */
  public static final String PAGEABLE_PROPERTIES = "X-Pageable-Properties";
}
