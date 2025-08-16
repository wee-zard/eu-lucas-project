package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import com.lucas.spring.components.folder.model.entity.embeddable.EmbeddedSharedFolderKey;
import com.lucas.spring.components.folder.repository.ShareFolderRepository;
import com.lucas.spring.components.folder.service.ShareFolderService;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implementation of the {@link ShareFolderService}.
 */
@Service
@AllArgsConstructor
public class ShareFolderServiceImpl implements ShareFolderService {
  private final ShareFolderRepository shareFolderRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public List<ShareFolderEntity> getShareFolders(final Long userId) {
    return this.shareFolderRepository.findAllByIdSharedWithUserId(userId);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<ShareFolderEntity> getSharedFolderByIdByUser(Long id, Long userId) {
    return this.shareFolderRepository.findById(
            EmbeddedSharedFolderKey.builder()
                    .folderId(id)
                    .sharedWithUserId(userId)
                    .build()
    );
  }
}
