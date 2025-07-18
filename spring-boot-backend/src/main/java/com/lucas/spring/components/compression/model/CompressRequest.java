package com.lucas.spring.components.compression.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * A compression request that tells which image should be fetched,
 * and sets the compression settings.
 */
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class CompressRequest {
  private String imagePath;
  private int loop;
  private int dataLength;
  private int compressedDataLength;
}
