package com.lucas.spring.components.folder.enums;

import com.lucas.spring.components.folder.exception.FolderException;

/**
 * Defines the error keys for the {@link FolderException}.
 */
public enum FolderExceptionEnum {
  FOLDER_ID_IS_NOT_PROVIDED,
  FOLDER_NO_WRITE_RIGHTS,
  FOLDER_TITLE_EXISTS,
  FOLDER_NOT_FOUND,
}
