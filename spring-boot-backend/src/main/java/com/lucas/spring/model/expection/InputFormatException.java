package com.lucas.spring.model.expection;

import com.lucas.spring.model.enums.InputFormatErrors;
import com.lucas.spring.model.expection.abstraction.BaseException;

/**
 * Custom-made Input format exception that is thrown,
 * when the requested type format of the input is incorrect.
 * Such as, if {@link Number} is requested, but {@link String} was
 * provided, then this exception will be thrown.
 */
public class InputFormatException extends BaseException {
  public InputFormatException(final InputFormatErrors enums) {
    super(enums.getErrorMessage());
  }

  public InputFormatException(
        final InputFormatErrors enums,
        final String errorAtParam) {
    super(enums.getErrorMessage(), errorAtParam);
  }
}
