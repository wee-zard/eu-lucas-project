package com.lucas.spring.controllers;

import com.lucas.spring.helper.helper.ConversionHelper;
import com.lucas.spring.helper.utils.FormatParseUtil;
import com.lucas.spring.model.dto.ProcedureLogDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.response.PageableResponse;
import com.lucas.spring.services.service.ProcedureLogService;
import lombok.AllArgsConstructor;
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
   * Fetches the procedure logs associated with the requested image.
   *
   * @return List of procedure logs that are associated with the image.
   */
  @CrossOrigin
  @GetMapping("/")
  public PageableResponse<ProcedureLogDto> getProcedureLogsByImageId(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
          @RequestHeader(ConversionHelper.PAGEABLE_PROPERTIES) PageableProperties properties,
          @RequestParam String imageId
  ) {
    return conversionHelper.listToPageableResponse(
            procedureLogService.getProcedureLogsByImageId(
                    FormatParseUtil.parseStringIntoNumber(imageId),
                    properties
            ),
            ProcedureLogDto.class,
            properties);
  }
}
