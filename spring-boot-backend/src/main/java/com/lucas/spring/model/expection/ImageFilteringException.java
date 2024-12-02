package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.ImageFilteringEnum;
import com.lucas.spring.model.expection.abstraction.BaseException;

/**
 * Custom-made Image Filtering exception that is thrown,
 * when there is a problem with the provided filters.
 */
public class ImageFilteringException extends BaseException {
  public ImageFilteringException(final ImageFilteringEnum imageFilteringEnum) {
    super(imageFilteringEnum.getMessageName());
  }

  public ImageFilteringException(
          final ImageFilteringEnum imageFilteringEnum,
          final String errorAtParam) {
    super(imageFilteringEnum.getMessageName(), errorAtParam);
  }
}
