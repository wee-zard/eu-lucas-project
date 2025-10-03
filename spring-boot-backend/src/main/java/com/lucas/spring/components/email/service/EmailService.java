package com.lucas.spring.components.email.service;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.email.model.entity.EmailEntity;
import com.lucas.spring.components.report.model.request.ReportRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service interface for the emails.
 */
public interface EmailService {

  /**
   * List out all the emails from the db.
   *
   * @param pageable The pageable options.
   * @return Returns the list of emails.
   */
  Page<EmailEntity> findAll(Pageable pageable);

  /**
   * Removes an entity.
   *
   * @param entity The entity to remove.
   */
  void delete(EmailEntity entity);

  /**
   * Removes an entity by their id.
   *
   * @param id The id of the entity to remove.
   */
  void delete(Long id);

  /**
   * Saves the provided report and creates an email template.
   *
   * @param report The report to save as an email.
   * @param user The user who initiated the request and sent the report.
   */
  void save(final ReportRequest report, final AuthenticatedUser user);
}
