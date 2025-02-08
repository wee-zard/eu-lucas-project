package com.lucas.spring.services.service.impl;

import com.lucas.spring.repositories.BoundingBoxRepository;
import com.lucas.spring.model.entity.BoundingBoxEntity;
import com.lucas.spring.services.service.BoundingBoxService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link BoundingBoxService}.
 */
@Service
@AllArgsConstructor
public class BoundingBoxServiceImpl implements BoundingBoxService {
  private final BoundingBoxRepository boundingBoxRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public BoundingBoxEntity saveBoundingBox(final BoundingBoxEntity box) {
    return boundingBoxRepository.save(box);
  }
}
