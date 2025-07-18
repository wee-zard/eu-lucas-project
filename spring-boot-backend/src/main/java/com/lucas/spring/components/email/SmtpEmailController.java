package com.lucas.spring.components.email;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.components.email.model.request.ReportEmailRequest;
import com.lucas.spring.components.email.service.SmtpEmailService;
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
   * @param user The user who initialized the request.
   * @param emailRequest The email template we want to send to the server.
   */
  @CrossOrigin
  @PostMapping("/report")
  public BaseResponse postReportEmail(
      @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
      @RequestBody final ReportEmailRequest emailRequest
  ) {
    smtpEmailService.buildEmail(emailRequest, user.getUserId());
    return new BaseResponse();
  }
}
