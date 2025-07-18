package com.lucas.spring.commons.exception.abstraction;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;
import org.json.simple.JSONObject;

/**
 * The root class of all Exceptions that is thrown from the app.
 */
@Getter
public abstract class BaseException extends RuntimeException {
  /**
   * Throws an error message.
   *
   * @param message The error message to display in the console.
   */
  protected BaseException(final Object message) {
    super(getStringFormatOfParams(message));
  }

  /**
   * Throws an error message, with an additional parameter where
   * the error occurred.
   *
   * @param message The error message to display in the console.
   * @param errorAtParam The param which initiated the exception.
   */
  protected BaseException(final Object message, final Object errorAtParam) {
    super(getStringFormatOfParams(message, errorAtParam));
  }

  /**
   * Returns a JSON string that holds the error message key, and the params.
   *
   * @param message The message enum key that hold what is the caused of the exception.
   * @param params With what params the exception was thrown.
   * @return Returns a JSON string format.
   */
  private static String getStringFormatOfParams(final Object message, final Object... params) {
    final List<String> listOfParams = Arrays.stream(params).map(String::valueOf).toList();
    final Map<String, String> map = new HashMap<>();
    map.put("key", String.valueOf(message));

    for (int i = 0; i < listOfParams.size(); i++) {
      map.put(String.format("param%s", i), listOfParams.get(i));
    }

    JSONObject object = new JSONObject(map);
    return object.toJSONString();
  }
}
