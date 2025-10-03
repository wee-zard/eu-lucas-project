package com.lucas.spring.components.report.facade.impl;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.email.service.EmailService;
import com.lucas.spring.components.report.facade.ReportFacade;
import com.lucas.spring.components.report.model.request.ReportRequest;
import com.lucas.spring.components.report.service.ReportService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Service implementation of the Report Service interface.
 */
@Service
@AllArgsConstructor
public class ReportFacadeImpl implements ReportFacade {
  private final EmailService emailService;
  private final ReportService reportService;

  /**
   * {@inheritDoc}
   */
  @Override
  @Transactional
  public void save(final ReportRequest request, final AuthenticatedUser user) {
    reportService.save(request, user);
    emailService.save(request, user);
  }
}
