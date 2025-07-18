package com.lucas.spring.components.image.service;

import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.image.model.request.FilteringQueryRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Defines methods related to the image filtering.
 */
@Service
public interface ImageFilterService {

  /**
   * Create a criteria builder based on the provided active filters.
   *
   * @param filteringQueryRequest the filters we want to use to fetch the images.
   * @param pageable the properties of the pageable response.
   */
  Page<ImageEntity> filterImages(FilteringQueryRequest filteringQueryRequest, Pageable pageable);
}
