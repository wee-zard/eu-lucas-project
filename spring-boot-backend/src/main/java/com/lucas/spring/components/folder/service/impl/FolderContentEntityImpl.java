package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.entity.QueryBuilderEntity;
import com.lucas.spring.components.folder.model.entity.embeddable.EmbeddedFolderContentKey;
import com.lucas.spring.components.folder.repository.FolderContentRepository;
import com.lucas.spring.components.folder.service.FolderContentService;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the Folder Content Service.
 */
@Service
@AllArgsConstructor
public class FolderContentEntityImpl implements FolderContentService {
  private final FolderContentRepository folderContentRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final Long folderId, final Long imageId, final Long queryId) {
    final FolderContentEntity entity = FolderContentEntity.builder()
            .folder(new FolderEntity(folderId))
            .image(new ImageEntity(imageId))
            .id(EmbeddedFolderContentKey.builder()
                    .folderId(folderId)
                    .imageId(imageId)
                    .build())
            .queryBuilder(new QueryBuilderEntity(queryId))
            .build();

    System.out.printf("[FOLDER_CONTENT]: %s%n", entity.toString());

    this.folderContentRepository.save(entity);
  }
}
