package com.lucas.spring.services.service;

import com.lucas.spring.model.request.filtering.ImageFilteringRequest;
import org.springframework.stereotype.Service;

/**
 * Defines methods related to the image filtering.
 */
@Service
public interface ImageFilterService {
  /**
   * Create a criteria builder based on the provided active filters.
   *
   * @param imageFilteringRequest the filters we want to use to fetch the images.
   */
  void filterImage(ImageFilteringRequest imageFilteringRequest);
}
