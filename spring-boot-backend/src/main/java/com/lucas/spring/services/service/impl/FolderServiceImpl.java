package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.FolderEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.enums.FolderExceptionEnum;
import com.lucas.spring.model.expection.FolderException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.repositories.FolderRepository;
import com.lucas.spring.services.service.FolderService;
import java.util.List;
import lombok.AllArgsConstructor;
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
  public FolderEntity save(final String title, final String description, final AuthenticatedUser user) {
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
  public List<FolderEntity> getFolders(final Long userId) {
    // TODO: Ez minden mappát lekér, de nekem kifejezetten a felhasználó mappái kellenek.
    return this.folderRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderEntity getFolderById(final Long folderId) throws RuntimeException {
    return this.folderRepository
            .findById(folderId)
            .orElseThrow(() -> new FolderException(
                    FolderExceptionEnum.FOLDER_NOT_FOUND,
                    String.valueOf(folderId)));
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public boolean isFolderExistsByUser(final String title, final AuthenticatedUser user) {
    final UserEntity userEntity = new UserEntity(user.getUserId());
    return this.folderRepository.existsFolderEntityByTitleAndOwner(title, userEntity);
  }
}
