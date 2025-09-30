package com.lucas.spring.components.procedure;

import com.lucas.spring.commons.helper.ConversionHelper;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.commons.utils.FormatParseUtil;
import com.lucas.spring.components.procedure.model.dto.ProcedureLogDto;
import com.lucas.spring.components.procedure.service.ProcedureLogService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the procedure logs.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/procedure-log")
public class ProcedureLogController {
  private final ProcedureLogService procedureLogService;
  private final ConversionHelper conversionHelper;

  /**
   * Fetches the list of procedure logs from the server.
   *
   * @param user The user who initiated the request.
   * @return List of procedure logs.
   */
  @CrossOrigin
  @GetMapping("/")
  public PageableResponse<ProcedureLogDto> getProcedureLogs(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestHeader(ConversionHelper.PAGEABLE_PROPERTIES) Pageable pageable
  ) {
    return conversionHelper.convertPage(
            procedureLogService.findAll(pageable),
            ProcedureLogDto.class);
  }

  /**
   * Fetches the procedure logs associated with the requested image.
   *
   * @param user The user who initiated the request.
   * @return List of procedure logs that are associated with the image.
   */
  @CrossOrigin
  @GetMapping("/log-by-image")
  public PageableResponse<ProcedureLogDto> getProcedureLogsByImageId(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestHeader(ConversionHelper.PAGEABLE_PROPERTIES) Pageable pageable,
          @RequestParam String imageId
  ) {
    final int formattedImageId = FormatParseUtil.parseToInteger(imageId);
    return conversionHelper.convertPage(
            procedureLogService.findAllByImageId(formattedImageId, pageable),
            ProcedureLogDto.class);
  }
}
