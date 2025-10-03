package com.lucas.spring.components.report.service;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.report.model.request.ReportRequest;

/**
 * Service interface for the uploaded reports.
 */
public interface ReportService {

  /**
   * Saves the provided report.
   *
   * @param request The request we want to save.
   * @param user The user who initiated the request.
   */
  void save(ReportRequest request, AuthenticatedUser user);
}
