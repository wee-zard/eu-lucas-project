package com.lucas.spring.components.email.service;

import com.lucas.spring.components.email.model.request.ReportEmailRequest;
import com.lucas.spring.components.user.model.request.UserCreationRequest;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the email sender service.
 */
@Service
public interface SmtpEmailService {

  /**
   * Sends out report emails from the users.
   *
   * @param request the details to send to the subject.
   * @param userId the id of the user who reported the bug.
   */
  void buildEmail(ReportEmailRequest request, Long userId);

  /**
   * Send out user creation email.
   *
   * @param request the user creation request that was sent from the frontend
   *                for the purpose of creating new users and allowing them to
   *                access this website.
   */
  void buildEmail(UserCreationRequest request);
}
