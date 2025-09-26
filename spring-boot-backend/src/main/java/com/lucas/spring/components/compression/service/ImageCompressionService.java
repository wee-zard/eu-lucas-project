package com.lucas.spring.components.compression.service;

import com.lucas.spring.components.compression.model.CompressRequest;

/**
 * Stores methods to the service.
 */
public interface ImageCompressionService {
  /**
   * Compress the provided image.
   */
  void compress(CompressRequest request);

  /**
   * Decompress the provided image.
   *
   * @param imagePath The path to the image to decompress.
   */
  void decompress(String imagePath);
}
