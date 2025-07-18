package com.lucas.spring.components.folder.enums;

import com.lucas.spring.components.folder.exception.FolderException;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the error keys for the {@link FolderException}.
 */
@Getter
@AllArgsConstructor
public enum FolderExceptionEnum {
  FOLDER_TITLE_EXISTS("A mappanév már használatban van! Kérlek adj meg egy másik nevet!"),
  FOLDER_NOT_FOUND("A mappa nem létezik!");
  private final String message;
}
