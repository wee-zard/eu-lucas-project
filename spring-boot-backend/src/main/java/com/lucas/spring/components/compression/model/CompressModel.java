package com.lucas.spring.components.compression.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * A model for compressing images and storing their most important information
 * such as the header and the compressed data.
 */
@Builder
@Getter
@AllArgsConstructor
public class CompressModel {
  private String header;
  private List<String> compressedData;
}
