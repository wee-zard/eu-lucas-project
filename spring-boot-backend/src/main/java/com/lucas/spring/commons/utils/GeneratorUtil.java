package com.lucas.spring.commons.utils;

import java.nio.charset.StandardCharsets;
import java.util.Random;
import lombok.experimental.UtilityClass;

/**
 * Utility class of the generators.
 */
@UtilityClass
public class GeneratorUtil {
  public static final int RANDOM_INT_LENGTH = 6;
  public static final int RANDOM_STRING_LENGTH = 256;

  final Random random = new Random();

  /**
   * Generates a random string with the length provided by the param.
   *
   * @param length The length of the random string.
   * @return Returns a random generated string with the length provided by the params.
   */
  public String generateRandomString(final int length) {
    final byte[] array = new byte[length];
    random.nextBytes(array);
    return new String(array, StandardCharsets.UTF_8);
  }

  /**
   * Generates a random integer with the length provided by the param.
   *
   * @param length The length of the random integer.
   * @return Returns a random generated integer with the length provided by the params.
   */
  public int generateRandomInteger(final int length) {
    return random.nextInt(length);
  }
}
