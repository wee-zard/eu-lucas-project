package com.lucas.spring.components.folder.converters;

import com.lucas.spring.components.folder.model.dto.FolderDto;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link FolderEntity} to {@link FolderDto}.
 */
@Component
public class FolderEntityToFolderDtoConverter implements Converter<FolderEntity, FolderDto> {

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderDto convert(final FolderEntity source) {
    return FolderDto.builder()
            .id(source.getId())
            .title(source.getTitle())
            .description(source.getDescription())
            .folderContentSize(source.getFolderContents().size())
            .createdAt(source.getCreatedAt())
            .updatedAt(source.getUpdatedAt())
            .build();
  }
}
