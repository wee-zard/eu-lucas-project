package com.lucas.spring.components.folder.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.folder.facade.FolderContentFacade;
import com.lucas.spring.components.folder.facade.FolderHelperFacade;
import com.lucas.spring.components.folder.model.dto.FolderContentDto;
import com.lucas.spring.components.folder.model.model.FolderContentCreationModel;
import com.lucas.spring.components.folder.model.model.SelectedProcedureLogModel;
import com.lucas.spring.components.folder.service.FolderContentService;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Implementation of the folder content facade.
 */
@Service
@AllArgsConstructor
public class FolderContentFacadeImpl implements FolderContentFacade {
  private final FolderHelperFacade folderHelperFacade;
  private final FolderContentService folderContentService;
  private final CustomConversionService conversionService;

  /**
   * {@inheritDoc}
   */
  @Override
  public PageableResponse<FolderContentDto> findAllByFolderId(
          final String folderId,
          final AuthenticatedUser user,
          final Pageable pageable
  ) {
    final Long longFolderId = FormatParseUtil.parseToLong(folderId);
    folderHelperFacade.isFolderEditableElseException(longFolderId, user);

    // List out the paginated image ids. (images that should be presented on the view)
    final Page<Long> imageIds = folderContentService.getImageIdsByFolderId(longFolderId, pageable);

    final PageableResponse<FolderContentDto> response = new PageableResponse<>(
            conversionService.convert(
                    folderContentService.findAllContentByFolderIdAndImageIds(
                            longFolderId, imageIds.getContent()
                    ),
                    FolderContentDto.class
            ),
            pageable,
            imageIds.getTotalElements(),
            imageIds.getTotalPages());

    if (response.getContent().isEmpty()) {
      return response;
    }

    response.setContent(imageIds.getContent().stream().map(imageId -> {
      // Find one imageDto that has the id of "imageId"
      final List<FolderContentDto> folderContentDtoList = response.getContent().stream()
              .filter(responseContent ->
                      Objects.equals(responseContent.getImage().getId(), imageId))
              .toList();

      return FolderContentDto.builder()
              .image(folderContentDtoList.get(0).getImage())
              .logs(folderContentDtoList.stream()
                      .filter(dto -> !dto.getLogs().isEmpty())
                      .map(dto -> dto.getLogs().get(0))
                      .toList())
              .build();
    }).toList());
    return response;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void delete(final Long folderId, final Long imageId, final AuthenticatedUser user) {
    folderHelperFacade.isFolderEditableElseException(folderId, user);
    this.folderContentService.removeOldContents(List.of(new FolderContentCreationModel(
            folderId, imageId, SelectedProcedureLogModel.builder().build())),
            false);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void clearFolderContent(final Long folderId, final AuthenticatedUser user) {
    folderHelperFacade.isFolderOwnedByUserElseException(folderId, user);
    folderContentService.clearFolder(folderId);
  }
}
