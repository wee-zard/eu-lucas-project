package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.utils.PageablePropertiesUtil;
import com.lucas.spring.components.folder.enums.FolderExceptionEnum;
import com.lucas.spring.components.folder.exception.FolderException;
import com.lucas.spring.components.folder.model.dto.FolderDtoSlice;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.repository.FolderRepository;
import com.lucas.spring.components.folder.service.FolderService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Implementation of the Folder service.
 */
@Service
@AllArgsConstructor
public class FolderServiceImpl implements FolderService {
  private final FolderRepository folderRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity save(final FolderEntity folderEntity) {
    return this.folderRepository.save(folderEntity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity save(
          final String title,
          final String description,
          final AuthenticatedUser user
  ) {
    if (this.isFolderExistsByUser(title, user)) {
      throw new FolderException(FolderExceptionEnum.FOLDER_TITLE_EXISTS, title);
    }

    final FolderEntity folderEntity = FolderEntity.builder()
            .title(title)
            .description(description)
            .owner(new UserEntity(user.getUserId()))
            .build();

    return this.save(folderEntity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<FolderEntity> getFoldersByUserId(final Long userId) {
    return this.folderRepository.findAllByOwnerId(userId);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Page<FolderDtoSlice> getFoldersByUserId(final Long userId, final Pageable pageable) {
    return this.folderRepository.listOwnedAndSharedWithFoldersOfUser(userId, pageable);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<FolderDtoSlice> getAllSortedFoldersByUserId(final Long userId) {
    final Pageable pageable = PageablePropertiesUtil.create(0, Integer.MAX_VALUE, "updatedAt", "desc");
    return this.folderRepository.listOwnedAndSharedWithFoldersOfUser(userId, pageable).stream().toList();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity getFolderById(final Long folderId) {
    return this.folderRepository.findById(folderId)
            .orElseThrow(() -> new FolderException(
                    FolderExceptionEnum.FOLDER_NOT_FOUND,
                    String.valueOf(folderId)));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isFolderExistsByUser(final String title, final AuthenticatedUser user) {
    return this.folderRepository.existsFolderEntityByTitleAndOwnerId(title, user.getUserId());
  }
}
