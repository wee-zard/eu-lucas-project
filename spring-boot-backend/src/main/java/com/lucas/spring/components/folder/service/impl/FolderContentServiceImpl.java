package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.model.FolderContentCreationModel;
import com.lucas.spring.components.folder.repository.FolderContentRepository;
import com.lucas.spring.components.folder.service.FolderContentService;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
  public void removeOldContents(
          final List<FolderContentCreationModel> models,
          final boolean compareLogs
  ) {
    if (models.isEmpty()) {
      return;
    }

    final List<FolderContentEntity> folderContent =
            this.findAllByFolderId(models.get(0).getFolderId());

    folderContent.forEach(content -> {
      final FolderContentCreationModel model = FolderContentCreationModel.builder()
              .folderId(content.getFolder().getId())
              .imageId(content.getImage().getId())
              .build();

      if (this.isExists(model, models, compareLogs)) {
        this.repository.deleteById(content.getId());
      }
    });
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderContentEntity save(final FolderContentCreationModel model) {
    if (model == null) {
      return null;
    }

    final FolderContentEntity entity = FolderContentEntity.builder()
            .folder(new FolderEntity(model.getFolderId()))
            .image(new ImageEntity(model.getImageId()))
            .log(model.getLogModel() == null
                    ? null
                    : new ProcedureLogEntity(model.getLogModel().getLogId()))
            .build();

    return this.repository.save(entity);
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
  public Page<Long> getImageIdsByFolderId(final Long folderId, final Pageable pageable) {
    return this.repository.getImageIdsByFolderId(folderId, pageable);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<FolderContentEntity> findAllContentByFolderIdAndImageIds(
          final Long folderId,
          final List<Long> imageIds
  ) {
    return this.repository.findAllContentByFolderIdAndImageIds(folderId, imageIds);
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
          final List<FolderContentCreationModel> folderContent,
          final boolean compareLogs
  ) {
    return folderContent.stream().anyMatch(content ->
            Objects.equals(content.getImageId(), model.getImageId())
                    && ((compareLogs && (model.getLogModel() == null && content.getLogModel() == null) || (model.getLogModel() != null && content.getLogModel() != null))
                    || !compareLogs)
    );
  }
}
