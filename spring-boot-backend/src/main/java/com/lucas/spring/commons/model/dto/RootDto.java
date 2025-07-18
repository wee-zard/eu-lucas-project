package com.lucas.spring.commons.model.dto;

/**
 * A root dto class for the purpose of extending the
 * future dto classes from this class. Why? Because, if we want
 * to only pass dto classes to a method, then this root class will
 * help us pass it as an argument, and other entity classes will
 * not be able to pass if they are not extended from this class.
 */
public interface RootDto {
}
