package com.lucas.spring.components.image.enums;

import com.lucas.spring.components.image.exception.ImageException;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines the possible values what an
 * {@link ImageException} can throw.
 */
@Getter
@AllArgsConstructor
public enum ImageExceptionEnums {
  IMAGE_NOT_FOUND("Image is not found in the server!");
  private final String message;
}
