package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.components.folder.model.entity.ShareFolderEntity;
import com.lucas.spring.components.folder.repository.ShareFolderRepository;
import com.lucas.spring.components.folder.service.ShareFolderService;
import java.util.List;
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
}
