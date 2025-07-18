package com.lucas.spring.commons.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A base response object that will send back a
 * simple ok message object to the frontend, so
 * the frontend could acknowledge that the process in the backend
 * finished successfully.
 */
@Getter
@Builder
@ToString
public class BaseResponse {
  private final String message;
  private static final String BASE_RESPONSE_INIT = "DONE";

  /**
   * Init the Base Response with a default value.
   */
  public BaseResponse(final String message) {
    this.message = message;
  }

  /**
   * Init the Base Response with a default value.
   */
  public BaseResponse() {
    this.message = BASE_RESPONSE_INIT;
  }
}
