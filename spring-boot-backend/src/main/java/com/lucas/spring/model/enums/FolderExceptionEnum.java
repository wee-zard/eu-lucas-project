package com.lucas.spring.model.enums;

import com.lucas.spring.model.expection.FolderException;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the error keys for the {@link FolderException}.
 */
@Getter
@AllArgsConstructor
public enum FolderExceptionEnum {
  NOT_FOUND("A mappa nem létezik!");
  private final String message;
}
