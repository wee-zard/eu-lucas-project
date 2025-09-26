package com.lucas.spring.components.procedure.service;

import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;

/**
 * Stores methods related to the {@link BoundingBoxEntity}.
 */
public interface BoundingBoxService {

  /**
   * Saves the bounding box.
   *
   * @param box The bounding box we want to save.
   * @return Returns the new bounding box object.
   */
  BoundingBoxEntity saveBoundingBox(BoundingBoxEntity box);
}
