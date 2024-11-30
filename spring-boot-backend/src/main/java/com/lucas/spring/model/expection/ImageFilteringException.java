package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.expection.abstraction.BaseException;
import jakarta.annotation.Nullable;

/**
 * Custom-made Image Filtering exception that is thrown,
 * when there is a problem with the provided filters.
 */
public class ImageFilteringException extends BaseException {
  /**
   * Tells that at which param the error message is thrown error.
   */
  private @Nullable String errorAtParam;

  public ImageFilteringException(final ImageFilteringEnum imageFilteringEnum) {
    super(imageFilteringEnum.getMessageName());
  }

  public ImageFilteringException(
          final ImageFilteringEnum imageFilteringEnum,
          final String errorAtParam) {
    super(imageFilteringEnum.getMessageName(), errorAtParam);
  }
}
