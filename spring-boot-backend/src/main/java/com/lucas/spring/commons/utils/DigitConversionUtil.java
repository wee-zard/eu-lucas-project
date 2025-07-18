package com.lucas.spring.commons.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import lombok.experimental.UtilityClass;

/**
 * Utility class for Image compression and digit conversion.
 */
@UtilityClass
public class DigitConversionUtil {

  /**
   * TODO: .
   * */
  public String byteArrayToHex(final byte[] binaries) {
    StringBuilder hexStringBuffer = new StringBuilder();

    for (byte binary : binaries) {
      hexStringBuffer.append(byteToHex(binary));
    }

    return hexStringBuffer.toString();
  }

  /**
   * TODO: .
   * */
  public List<String> byteArrayToHexList(final byte[] binaries) {
    final List<String> hexList = new ArrayList<>();

    for (byte binary : binaries) {
      hexList.add(byteToHex(binary));
    }

    return hexList;
  }

  /**
   * TODO: .
   * */
  public String byteArrayToBinaryString(final byte[] bytes) {
    final StringBuilder builder = new StringBuilder();

    for (byte item : bytes) {
      builder.append(String.format("%8s", Integer.toBinaryString(item & 0xFF)).replace(' ', '0'));
    }

    return builder.toString();
  }

  /**
   * Decods a hexadecimal string into a byte array.
   *
   * @param hexString The hexadecimal string.
   * @return Returns the byte array version of the param.
   */
  public byte[] decodeHexString(final String hexString) {
    if (hexString.length() % 2 == 1) {
      throw new IllegalArgumentException("Invalid hexadecimal String supplied.");
    }

    byte[] bytes = new byte[hexString.length() / 2];

    for (int i = 0; i < hexString.length(); i += 2) {
      bytes[i / 2] = hexToByte(hexString.substring(i, i + 2));
    }

    return bytes;
  }

  /**
   * Converts byte to hexadecimal string.
   *
   * @param num The byte to convert.
   * @return Returns the hexadecimal version of the provided byte.
   */
  private String byteToHex(final byte num) {
    return new String(new char[]{
            Character.forDigit((num >> 4) & 0xF, 16),
            Character.forDigit((num & 0xF), 16)
    });
  }

  /**
   * Converts hexadecimal string to byte.
   *
   * @param hexString The hex to convert.
   * @return Returns the byte version of the hexadecimal string.
   */
  private byte hexToByte(String hexString) {
    int firstDigit = toDigit(hexString.charAt(0));
    int secondDigit = toDigit(hexString.charAt(1));
    return (byte) ((firstDigit << 4) + secondDigit);
  }

  /**
   * Converts a hexadecimal character to a digit.
   *
   * @param hexChar The hex to convert.
   * @return Returns a digit.
   */
  private int toDigit(char hexChar) {
    int digit = Character.digit(hexChar, 16);

    if (digit == -1) {
      throw new IllegalArgumentException(
              "Invalid Hexadecimal Character: " + hexChar);
    }

    return digit;
  }

  /**
   * Based on the provided param, merges two or more even
   * array cells into one.
   */
  public List<String> hexListToModifiedHexList(
          final String hexadecimals,
          final int compressionRate
  ) {
    final List<String> modifiedHexList = new ArrayList<>();
    final Pattern pattern = Pattern.compile(String.format("[0-9a-f]{1,%d}", compressionRate));
    final Matcher matcher = pattern.matcher(hexadecimals);

    while (matcher.find()) {
      modifiedHexList.add(matcher.group());
    }

    return modifiedHexList;
  }
}
