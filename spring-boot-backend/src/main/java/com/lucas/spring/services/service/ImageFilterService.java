package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.request.filtering.FilteringQueryRequest;
import org.springframework.data.domain.Page;
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
   * @param pageableProperties the properties of the pageable response.
   */
  Page<ImageEntity> filterImages(
          FilteringQueryRequest filteringQueryRequest,
          PageableProperties pageableProperties);
}
