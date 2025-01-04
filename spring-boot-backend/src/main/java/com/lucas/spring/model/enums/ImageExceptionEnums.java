package com.lucas.spring.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the possible values what an
 * {@link com.lucas.spring.model.expection.ImageException} can throw.
 */
@Getter
@AllArgsConstructor
public enum ImageExceptionEnums {
  IMAGE_NOT_FOUND("Image is not found in the server!");
  private final String message;
}
