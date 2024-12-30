package com.lucas.spring.model.entity.abstraction;

/**
 * Represents an entity that implemented the method
 * of {@link Comparable} for the purpose of comparing the
 * different table entities with each others.
 * <a href="https://www.baeldung.com/java-comparator-comparable#3-java-8-comparators">Java 8 Comparators documentation.</a>
 *
 * @param <T> A generic type of object.
 */
public abstract class BaseComparatorEntity<T> implements Comparable<T> {

  /**
   * Defines how two object should be equal with each other.
   * It must be implemented in the child.
   *
   * @return an int.
   */
  @Override
  public abstract boolean equals(Object o);

  /**
   * Defines a basic hashcode on the object.
   * It must be implemented in the child.
   *
   * @return an int.
   */
  @Override
  public abstract int hashCode();

  /**
   * Defines the comparison between two type of objects.
   * It must be implemented in the child.
   *
   * @return an int.
   */
  @Override
  public abstract int compareTo(T object);
}
