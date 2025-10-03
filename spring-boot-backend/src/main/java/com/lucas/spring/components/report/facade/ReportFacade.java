package com.lucas.spring.components.report.facade;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.report.model.request.ReportRequest;

/**
 * An interface for the report service.
 */
public interface ReportFacade {
  /**
   * Saves the provided report.
   *
   * @param request The request we want to save.
   * @param user The user who initiated the request.
   */
  void save(ReportRequest request, AuthenticatedUser user);
}
