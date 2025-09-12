package com.lucas.spring.components.folder.facade.impl;

import com.lucas.spring.commons.model.model.KeyValueModel;
import com.lucas.spring.components.folder.facade.FolderContentDataFacade;
import com.lucas.spring.components.folder.model.entity.FolderContentDataEntity;
import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.entity.FolderContentKeyEntity;
import com.lucas.spring.components.folder.service.FolderContentDataService;
import com.lucas.spring.components.folder.service.FolderContentKeyService;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation of the folder content data facade.
 */
@Service
@AllArgsConstructor
public class FolderContentDataFacadeImpl implements FolderContentDataFacade {
  private final FolderContentKeyService folderContentKeyService;
  private final FolderContentDataService folderContentDataService;

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final List<List<List<KeyValueModel>>> properties) {
    final Set<String> propertyKeys = new HashSet<>();

    properties.forEach(properties1 ->
            properties1.forEach(properties2 ->
                    properties2.forEach(properties3 -> propertyKeys.add(properties3.getKey())
            )));

    // Filter the list of keys and save only those that are note present in the db table.
    final List<String> newKeysToSave = propertyKeys.stream()
            .filter(key -> {
              final List<FolderContentKeyEntity> entities = this.folderContentKeyService.listAll();
              return entities.isEmpty() || entities.stream()
                      .noneMatch(keyModel -> Objects.equals(keyModel.getName(), key));
            }).toList();

    if (!newKeysToSave.isEmpty()) {
      this.folderContentKeyService.save(newKeysToSave);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final FolderContentEntity content, final List<KeyValueModel> properties) {
    final List<FolderContentKeyEntity> keys = this.folderContentKeyService.listAll();
    final List<FolderContentDataEntity> entities = properties.stream()
            .map(property ->
                    FolderContentDataEntity.builder()
                            .content(content)
                            .key(keys.stream()
                                    .filter(key -> Objects.equals(key.getName(), property.getKey()))
                                    .findFirst().orElse(null))
                            .value(property.getValue())
                            .build())
            .toList();

    this.folderContentDataService.saveAll(entities);
  }
}
