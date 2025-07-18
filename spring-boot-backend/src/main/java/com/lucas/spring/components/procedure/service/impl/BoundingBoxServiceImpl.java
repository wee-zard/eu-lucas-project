package com.lucas.spring.components.procedure.service.impl;

import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import com.lucas.spring.components.procedure.repository.BoundingBoxRepository;
import com.lucas.spring.components.procedure.service.BoundingBoxService;
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
