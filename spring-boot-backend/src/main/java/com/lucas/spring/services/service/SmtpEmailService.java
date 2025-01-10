package com.lucas.spring.services.service;

import com.lucas.spring.model.request.SmtpEmailRequest;
import jakarta.mail.MessagingException;
import org.springframework.stereotype.Service;

/**
 * An interface service where we store methods
 * related to the email sender service.
 */
@Service
public interface SmtpEmailService {

  /**
   * Sends an email to the subject with the provided email details.
   *
   * @param details the details to send to the subject.
   * @param userId the id of the user who reported the bug.
   * @return a string about the result.
   */
  String sendSimpleMail(SmtpEmailRequest details, Long userId) throws MessagingException;
}
