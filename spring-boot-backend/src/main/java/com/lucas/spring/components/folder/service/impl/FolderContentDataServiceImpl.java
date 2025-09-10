package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.FolderContentDataEntity;
import com.lucas.spring.components.folder.repository.FolderContentDataRepository;
import java.util.List;

import com.lucas.spring.components.folder.service.FolderContentDataService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation.
 */
@Service
@AllArgsConstructor
public class FolderContentDataServiceImpl implements FolderContentDataService {
  private final FolderContentDataRepository repository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void saveAll(final List<FolderContentDataEntity> entities) {
    this.repository.saveAll(entities);
  }
}
