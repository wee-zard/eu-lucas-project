package com.lucas.spring.components.procedure.converters;

import com.lucas.spring.commons.utils.CommonConversionUtil;
import com.lucas.spring.components.procedure.model.dto.ProcedureLogDto;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import lombok.NonNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link ProcedureLogEntity} to {@link ProcedureLogDto}.
 */
@Component
public class ProcedureLogEntityToProcedureLogDtoConverter
        implements Converter<ProcedureLogEntity, ProcedureLogDto> {

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureLogDto convert(final @NonNull ProcedureLogEntity source) {
    return CommonConversionUtil.toProcedureLogDto(source);
  }
}
