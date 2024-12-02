package com.lucas.spring.helper.helpers;

import lombok.experimental.UtilityClass;

/**
 * A utility class is a class that is just a namespace for functions.
 * No instances of it can exist, and all its members are static.
 * For example, java.lang.Math and java.util.Collections are well known utility classes.
 * This annotation automatically turns the annotated class into one.
 * <p></p>
 * A utility class cannot be instantiated.
 * By marking your class with @UtilityClass,
 * lombok will automatically generate a private constructor that throws an exception,
 * flags as error any explicit constructors you add, and marks the class final.
 * <p></p>
 * If the class is an inner class, the class is also marked static.
 * All members of a utility class are automatically marked as static.
 * Even fields and inner classes.
 * <p></p>
 * Link: <a href="https://projectlombok.org/features/experimental/UtilityClass">@UtilityClass documentation</a>
 */
@UtilityClass
public class FilteringUtil {

}
