package com.lucas.spring.commons.utils;

import com.google.gson.Gson;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import lombok.experimental.UtilityClass;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 * Utility class for performing actions on JSON objects, JSON strings.
 */
@UtilityClass
public class JsonUtil {
  /**
   * Converts the provided map into a json string.
   *
   * @param map The map to convert.
   * @return Returns a json string format of the map.
   */
  public String parseMapToString(final Map<?, ?> map) {
    return new JSONObject(map).toJSONString();
  }

  /**
   * Converts the provided json text into a {@link JSONObject} object,
   * so we could handle it more easily.
   *
   * @param jsonText An object in json string format.
   * @return Returns a Json object.
   */
  public JSONObject parseJsonStringtoJsonObject(final String jsonText) throws ParseException {
    return (JSONObject) new JSONParser().parse(jsonText);
  }

  /**
   * Converts the provided json byte array to map.
   *
   * @param jsonText An object in json string format.
   * @return Returns a map.
   */
  public Map<String, String> parseJsonStringToMap(final byte[] jsonText) throws ParseException {
    return parseJsonStringToMap(new String(jsonText));
  }

  /**
   * Converts the provided json string to map.
   *
   * @param jsonText An object in json string format.
   * @return Returns a map.
   */
  public Map<String, String> parseJsonStringToMap(final String jsonText) throws ParseException {
    final Map<String, String> map = new HashMap<>();
    final Set<Map.Entry<String, String>> entries = parseJsonStringtoJsonObject(jsonText).entrySet();

    entries.forEach(entry -> map.put(
            String.valueOf(entry.getKey()),
            String.valueOf(entry.getValue())
    ));

    return map;
  }

  /**
   * Converts the provided object into a JSON string, then later that string will be
   * converted into a map that will contain the key and values of the object.
   *
   * @param object The object to convert.
   * @return Returns the map of the object.
   */
  public <T> Map<String, String> parseObjectIntoMap(T object) throws ParseException {
    return parseJsonStringToMap(new Gson().toJson(object));
  }
}
