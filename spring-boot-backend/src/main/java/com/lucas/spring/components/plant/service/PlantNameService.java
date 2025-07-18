package com.lucas.spring.components.plant.service;

import org.springframework.stereotype.Service;

/**
 * Stores methods related to the Plant names.
 */
@Service
public interface PlantNameService {
  /**
   * Removes all existing entities from the table.
   */
  void deleteAll();
}
