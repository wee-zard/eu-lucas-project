package com.lucas.spring.components.folder.converters;

import com.lucas.spring.commons.utils.CommonConversionUtil;
import com.lucas.spring.components.folder.model.dto.FolderContentDto;
import com.lucas.spring.components.folder.model.dto.FolderDto;
import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.folder.model.entity.FolderEntity;
import com.lucas.spring.components.procedure.model.model.ProcedureLogModel;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link FolderEntity} to {@link FolderDto}.
 */
@Component
public class FolderContentEntityToFolderContentDtoConverter
        implements Converter<FolderContentEntity, FolderContentDto> {

  /**
   * {@inheritDoc}
   */
  @Override
  public FolderContentDto convert(final @NonNull FolderContentEntity source) {
    final Map<String, String> propertiesMap = new HashMap<>();

    source.getFolderContentDataset()
            .forEach(entity -> propertiesMap.put(entity.getKey().getName(), entity.getValue()));

    return FolderContentDto.builder()
            .image(CommonConversionUtil.toImageDto(source.getImage()))
            .logs(source.getLog() == null
                    ? Collections.emptyList()
                    : Collections.singletonList(ProcedureLogModel.builder()
                    .log(CommonConversionUtil.toProcedureLogDto(source.getLog()))
                    .properties(propertiesMap)
                    .build()))
            .build();
  }
}
