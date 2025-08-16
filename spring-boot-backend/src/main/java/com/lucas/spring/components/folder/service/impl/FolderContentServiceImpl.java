package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.model.FolderContentCreationModel;
import com.lucas.spring.components.folder.repository.FolderContentRepository;
import com.lucas.spring.components.folder.service.FolderContentService;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the Folder Content Service.
 */
@Service
@AllArgsConstructor
public class FolderContentServiceImpl implements FolderContentService {
  private final FolderContentRepository repository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void saveAll(final List<FolderContentCreationModel> models) {
    if (models.isEmpty()) {
      return;
    }

    final List<FolderContentCreationModel> folderContent =
            this.repository.findFolderContentCreationModelByFolderId(models.get(0).getFolderId());

    final List<FolderContentEntity> filteredModels = models.stream()
            .filter(model -> !this.isExists(model, folderContent))
            .map(model -> FolderContentEntity.builder()
                    .folder(new FolderEntity(model.getFolderId()))
                    .image(new ImageEntity(model.getImageId()))
                    .boundingBox(model.getBoundingBoxId() == null
                            ? null
                            : new BoundingBoxEntity(model.getBoundingBoxId()))
                    .build())
            .toList();

    this.repository.saveAll(filteredModels);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<FolderContentEntity> findAllByFolderId(final Long folderId) {
    return this.repository.findFolderContentEntityByFolderId(folderId);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void clearFolder(final Long folderId) {
    final List<FolderContentEntity> contents = this.findAllByFolderId(folderId);
    this.repository.deleteAll(contents);
  }

  private boolean isExists(
          final FolderContentCreationModel model,
          final List<FolderContentCreationModel> folderContent
  ) {
    return folderContent.stream().anyMatch(content ->
            Objects.equals(content.getBoundingBoxId(), model.getBoundingBoxId())
                    && Objects.equals(content.getImageId(), model.getImageId()));
  }

  private boolean isNotExists(final FolderContentCreationModel model) {
    return this.repository.existsFolderIdAndImageIdAndBoundingBoxIdByFolderIdAndImageIdAndBoundingBoxId(model.getFolderId(), model.getImageId(), model.getBoundingBoxId());
  }
}
