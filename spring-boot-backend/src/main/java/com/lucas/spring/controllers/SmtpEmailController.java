package com.lucas.spring.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.ReportEmailRequest;
import com.lucas.spring.model.response.BaseResponse;
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
   * Upload a report log and send it out to an email address.
   *
   * @param emailRequest The email template we want to send to the server.
   */
  @CrossOrigin
  @PostMapping("/report")
  public BaseResponse postReportEmail(
      @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
      @RequestBody final ReportEmailRequest emailRequest
  ) throws MessagingException {
    smtpEmailService.buildEmail(emailRequest, authenticatedUser.getUserId());
    return new BaseResponse();
  }
}
