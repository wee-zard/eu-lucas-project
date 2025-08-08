package com.lucas.spring.commons.exception.abstraction;

import com.lucas.spring.commons.utils.JsonUtil;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.Getter;

/**
 * The root class of all Exceptions that is thrown from the app.
 */
@Getter
public abstract class BaseException extends RuntimeException {
  private static final String ERROR_MESSAGE_KEY_PROPERTY_NAME = "key";
  private static final String ERROR_MESSAGE_PARAM_PROPERTY_NAME = "param";

  /**
   * Throws an error message, with an additional parameter where
   * the error occurred.
   *
   * @param message The error message to display in the console.
   * @param errorAtParam The param which initiated the exception.
   */
  protected BaseException(final Object message, final Object... errorAtParam) {
    super(getStringFormatOfParams(message, errorAtParam));
  }

  public static String getErrorKey() {
    return ERROR_MESSAGE_KEY_PROPERTY_NAME;
  }

  public static <T> String getErrorMessageParamById(final T id) {
    return String.format("%s%s", ERROR_MESSAGE_PARAM_PROPERTY_NAME, id);
  }

  /**
   * Returns a JSON string that holds the error message key, and the params.
   *
   * @param message The message enum key that hold what is the caused of the exception.
   * @param params With what params the exception was thrown.
   * @return Returns a JSON string format.
   */
  private static String getStringFormatOfParams(final Object message, final Object... params) {
    final List<String> listOfParams = params.length > 0
            ? Arrays.stream(params)
              .map(BaseException::extractPrimitiveValueFromObjectAndConvertToText)
              .toList()
            : new ArrayList<>();

    final Map<String, String> map = new HashMap<>();
    listOfParams.forEach(param -> map.put(getErrorMessageParamById(map.size()), param));
    map.put(getErrorKey(), extractPrimitiveValueFromObjectAndConvertToText(message));

    return JsonUtil.parseMapToString(map);
  }

  /**
   * Converts the provided object to text.
   *
   * @param object The object to convert.
   * @return The string format version of the provided object.
   */
  private static String extractPrimitiveValueFromObjectAndConvertToText(final Object object) {
    return object instanceof Enum ? String.valueOf(object) : ((Object[]) object)[0].toString();
  }
}
