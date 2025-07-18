package com.lucas.spring.components.procedure.converters;

import com.lucas.spring.components.procedure.model.dto.ProcedureDto;
import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link ProcedureEntity} to {@link ProcedureDto}.
 */
@Component
public class ProcedureEntityToProcedureDtoConverter
        implements Converter<ProcedureEntity, ProcedureDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureDto convert(final ProcedureEntity source) {
    return ProcedureDto.builder()
            .id(source.getId())
            .name(source.getName())
            .initUserName(source.getInitUserId().getUserName())
            .build();
  }
}
