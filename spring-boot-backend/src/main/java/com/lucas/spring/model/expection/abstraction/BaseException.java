package com.lucas.spring.model.expection.abstraction;

import java.util.HashMap;
import java.util.Map;
import lombok.Getter;
import org.json.simple.JSONObject;

/**
 * The root class of all Exceptions that is thrown from the app.
 */
@Getter
public abstract class BaseException extends RuntimeException {
  /**
   * Tells that at which param the error message is thrown error.
   */
  private final String errorAtParam;

  /**
   * Throws an error message.
   *
   * @param message The error message to display in the console.
   */
  protected BaseException(final String message) {
    super(message);
    this.errorAtParam = null;
  }

  /**
   * Throws an error message, with an additional parameter where
   * the error occurred.
   *
   * @param message The error message to display in the console.
   * @param errorAtParam The param which initiated the exception.
   */
  protected BaseException(final String message, final String errorAtParam) {
    super(message);
    this.errorAtParam = errorAtParam;
  }

  /**
   * Returns a JSON string that holds the error message key, and the params.
   *
   * @param message The message enum key that hold what is the caused of the exception.
   * @param params With what params the exception was thrown.
   * @return Returns a JSON string format.
   */
  protected static String getStringFormatOfParams(final String message, final String... params) {
    final Map<String, String> map = new HashMap<>();
    map.put("key", message);

    for (int i = 0; i < params.length; i++) {
      map.put(String.format("param%s", i), params[i]);
    }

    JSONObject object = new JSONObject(map);
    return object.toJSONString();
  }
}
