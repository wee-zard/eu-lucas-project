package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.FolderContentKeyEntity;
import com.lucas.spring.components.folder.repository.FolderContentKeyRepository;
import com.lucas.spring.components.folder.service.FolderContentKeyService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation.
 */
@Service
@AllArgsConstructor
public class FolderContentKeyServiceImpl implements FolderContentKeyService {
  private final FolderContentKeyRepository repository;

  /**
   * {@inheritDoc}
   */
  @Override
  public List<FolderContentKeyEntity> listAll() {
    return this.repository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final List<String> keys) {
    final List<FolderContentKeyEntity> entities = keys.stream()
            .map(key -> FolderContentKeyEntity.builder()
                    .name(key)
                    .build())
            .toList();

    this.repository.saveAll(entities);
  }
}
