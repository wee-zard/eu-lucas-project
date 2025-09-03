package com.lucas.spring.commons.utils;

import java.util.Random;
import lombok.experimental.UtilityClass;

/**
 * A util for generating random numbers.
 */
@UtilityClass
public class RandomUtil {
  private Random rand = new Random();

  /**
   * Generates a random number between two numbers.
   *
   * <p><strong>Example</strong>:
   *
   * <p><strong>Input</strong>: lowerBound=0, upperBound=50</p>
   *
   * <p><strong>Output</strong>: A random number between [0, 49]</p>
   * </p>
   *
   * @param lowerBound The lower bound of the random number.
   * @param upperBound The upper bound of the random number.
   * @return Returns a random number between the bounds.
   */
  public Long getRandomBetween(final Long lowerBound, final Long upperBound) {
    return rand.nextLong(upperBound) + lowerBound;
  }

  /**
   * Generates a random number between two numbers.
   *
   * <p><strong>Example</strong>:
   *
   * <p><strong>Input</strong>: lowerBound=0, upperBound=50</p>
   *
   * <p><strong>Output</strong>: A random number between [0, 49]</p>
   * </p>
   *
   * @param lowerBound The lower bound of the random number.
   * @param upperBound The upper bound of the random number.
   * @return Returns a random number between the bounds.
   */
  public Integer getRandomBetween(final Integer lowerBound, final Integer upperBound) {
    return rand.nextInt(upperBound) + lowerBound;
  }
}
