package com.lucas.spring.components.report;

import com.lucas.spring.commons.constants.ApplicationConstants;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.components.report.facade.ReportFacade;
import com.lucas.spring.components.report.model.dto.ReportDto;
import com.lucas.spring.components.report.model.request.ReportRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
  private final CustomConversionService conversionService;

  /**
   * Upload a report log.
   *
   * @param user The user who initialized the request.
   */
  @CrossOrigin
  @GetMapping("/")
  public PageableResponse<ReportDto> listAllReport(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
          @RequestHeader(ApplicationConstants.PAGEABLE_PROPERTIES) final Pageable pageable
  ) {
    return conversionService.convert(reportFacade.findAll(pageable), ReportDto.class);
  }

  /**
   * Upload a report log.
   *
   * @param user The user who initialized the request.
   * @param request The request that contains the report.
   */
  @CrossOrigin
  @PostMapping("/save")
  public BaseResponse postReportEmail(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
          @RequestBody final ReportRequest request
  ) {
    reportFacade.save(request, user);
    return new BaseResponse();
  }
}
