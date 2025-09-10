package com.lucas.spring.components.folder.service.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.commons.utils.PageablePropertiesUtil;
import com.lucas.spring.components.authorization.enums.AuthorizationExceptionEnum;
import com.lucas.spring.components.authorization.exception.AuthorizationException;
import com.lucas.spring.components.folder.enums.FolderExceptionEnum;
import com.lucas.spring.components.folder.exception.FolderException;
import com.lucas.spring.components.folder.model.dto.FolderDtoSlice;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.folder.model.model.FolderFormWithFolderIdModel;
import com.lucas.spring.components.folder.repository.FolderRepository;
import com.lucas.spring.components.folder.service.FolderService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
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
  private final FolderRepository repository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void update(final FolderFormWithFolderIdModel request) {
    final FolderEntity entity =
            this.getFolderById(FormatParseUtil.parseToLong(request.getFolderId()));

    entity.setTitle(request.getTitle());
    entity.setDescription(request.getDescription());
    entity.setUpdatedAt(Instant.now());

    this.repository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity save(final FolderEntity folderEntity) {
    return this.repository.save(folderEntity);
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
    return this.repository.findAllByOwnerId(userId);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Page<FolderDtoSlice> getFoldersByUserId(final Long userId, final Pageable pageable) {
    return this.repository.listOwnedAndSharedWithFoldersOfUser(userId, pageable);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public List<FolderDtoSlice> getAllSortedFoldersByUserId(final Long userId) {
    final Pageable pageable = PageablePropertiesUtil.create(0, Integer.MAX_VALUE, "updatedAt", "desc");
    return this.repository.listOwnedAndSharedWithFoldersOfUser(userId, pageable).stream().toList();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity getFolderById(final Long folderId) {
    return this.repository.findById(folderId).orElseThrow(() -> new FolderException(
            FolderExceptionEnum.FOLDER_NOT_FOUND, folderId));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isFolderExistsByUser(final String title, final AuthenticatedUser user) {
    return this.repository.existsFolderEntityByTitleAndOwnerId(title, user.getUserId());
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void delete(final FolderEntity folder, final AuthenticatedUser user) {
    this.repository.delete(folder);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isUserOwnerOfFolder(final FolderEntity folder, final AuthenticatedUser user) {
    if (folder == null) {
      throw new FolderException(FolderExceptionEnum.FOLDER_NOT_FOUND);
    }

    if (user == null) {
      throw new AuthorizationException(AuthorizationExceptionEnum.USER_NOT_FOUND);
    }

    return Objects.equals(folder.getOwner().getId(), user.getUserId());
  }
}
