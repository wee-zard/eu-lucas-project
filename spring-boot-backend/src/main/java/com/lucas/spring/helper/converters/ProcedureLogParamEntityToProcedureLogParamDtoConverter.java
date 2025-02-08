package com.lucas.spring.helper.converters;

import com.lucas.spring.model.dto.ProcedureLogParamDto;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link ProcedureLogParamEntity} to {@link ProcedureLogParamDto}.
 */
@Component
public class ProcedureLogParamEntityToProcedureLogParamDtoConverter
        implements Converter<ProcedureLogParamEntity, ProcedureLogParamDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureLogParamDto convert(final ProcedureLogParamEntity source) {
    return ProcedureLogParamDto.builder()
            .procedureParamName(source.getProcedureLogParam().getProcedureParamName())
            .build();
  }
}
