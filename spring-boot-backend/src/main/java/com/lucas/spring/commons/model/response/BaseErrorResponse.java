package com.lucas.spring.commons.model.response;

import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Describes a base error message that is sent back to the frontend.
 * It holds the status code of the error and the message of the error
 * that must be displayed in a view for the user.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BaseErrorResponse {
  /**
   * The message of the error.
   */
  private String message;
  /**
   * Tells that at which param the error message is thrown error.
   */
  private @Nullable String errorAtParam;
}
