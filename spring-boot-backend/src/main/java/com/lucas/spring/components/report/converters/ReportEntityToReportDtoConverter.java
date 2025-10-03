package com.lucas.spring.components.report.converters;

import com.lucas.spring.components.procedure.model.dto.ProcedureDto;
import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.report.model.dto.ReportDto;
import com.lucas.spring.components.report.model.entity.ReportEntity;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

/**
 * Defines a conversion from {@link ReportEntity} to {@link ProcedureDto}.
 */
@Component
public class ReportEntityToReportDtoConverter
        implements Converter<ReportEntity, ReportDto> {
  /**
   * {@inheritDoc}
   */
  @Override
  public ReportDto convert(final ReportEntity source) {
    return ReportDto.builder()
            .id(source.getId())
            .type(source.getType())
            .title(source.getTitle())
            .description(source.getDescription())
            .reporter(source.getReporter().getUserName())
            .status(source.getStatus().getStatus())
            .createdAt(source.getCreatedAt().toString())
            .build();
  }
}
