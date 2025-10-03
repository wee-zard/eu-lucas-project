package com.lucas.spring.components.report;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.components.report.facade.ReportFacade;
import com.lucas.spring.components.report.model.request.ReportRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * A controller for the report functionalities.
 */
@RestController
@RequestMapping(path = "api/report")
@RequiredArgsConstructor
public class ReportController {
  private final ReportFacade reportFacade;

  /**
   * Upload a report log.
   *
   * @param user The user who initialized the request.
   * @param request The request that contains the report.
   */
  @CrossOrigin
  @PostMapping("/save")
  public BaseResponse postReportEmail(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody @Valid final ReportRequest request
  ) {
    reportFacade.save(request, user);
    return new BaseResponse();
  }
}
