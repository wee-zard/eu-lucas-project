package com.lucas.spring.api.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.SmtpEmailRequest;
import com.lucas.spring.services.service.SmtpEmailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the report email.
 */
@RestController
@RequestMapping(path = "api/email")
@RequiredArgsConstructor
public class SmtpEmailController {
  private final SmtpEmailService smtpEmailService;

  /**
   * ...
   *
   * @param emailRequest ...
   */
  @CrossOrigin
  @PostMapping("/report-log")
  public String postReportEmail(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
      @RequestBody final SmtpEmailRequest emailRequest
  ) throws MessagingException {
    return smtpEmailService.sendSimpleMail(emailRequest);
  }
}
