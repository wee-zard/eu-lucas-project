package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.FolderEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.enums.FolderExceptionEnum;
import com.lucas.spring.model.expection.FolderException;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.folder.FolderCreationRequest;
import com.lucas.spring.repositories.FolderRepository;
import com.lucas.spring.services.service.FolderService;
import jakarta.transaction.Transactional;
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
  public void save(final FolderEntity folderEntity) {
    this.folderRepository.save(folderEntity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void save(final FolderCreationRequest request, final AuthenticatedUser user) {
    final UserEntity userEntity = new UserEntity();
    userEntity.setId(user.getUserId());
    final FolderEntity folderEntity = FolderEntity.builder()
            .title(request.getTitle())
            .description(request.getDescription())
            .owner(userEntity)
            .build();
    // TODO: The images and the queries are not saved
    this.save(folderEntity);
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
            .orElseThrow(() -> new FolderException(FolderExceptionEnum.NOT_FOUND));
  }
}
