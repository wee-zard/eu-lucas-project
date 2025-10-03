package com.lucas.spring.components.report.service.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.report.enums.ReportStatusEnum;
import com.lucas.spring.components.report.model.entity.ReportEntity;
import com.lucas.spring.components.report.model.entity.ReportStatusEntity;
import com.lucas.spring.components.report.model.request.ReportRequest;
import com.lucas.spring.components.report.repository.ReportRepository;
import com.lucas.spring.components.report.service.ReportService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation of the uploaded report service.
 */
@Service
@AllArgsConstructor
public class ReportServiceImpl implements ReportService {
  private final ReportRepository repository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void save(final ReportRequest request, final AuthenticatedUser user) {
    final ReportEntity entity = ReportEntity.builder()
            .reporter(new UserEntity(user.getUserId()))
            .type(String.valueOf(request.getReportType()))
            .title(request.getTitle())
            .description(request.getMessage())
            .status(new ReportStatusEntity(ReportStatusEnum.PENDING.getId()))
            .build();

    repository.save(entity);
  }
}
