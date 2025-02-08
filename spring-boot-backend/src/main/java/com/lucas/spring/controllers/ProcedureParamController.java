package com.lucas.spring.controllers;

import com.lucas.spring.controllers.abstraction.BaseController;
import com.lucas.spring.model.dto.ProcedureLogParamDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.response.PageableResponse;
import com.lucas.spring.services.service.ProcedureLogParamService;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the procedure params.
 */
@RestController
@RequestMapping(path = "api/procedure-param")
public class ProcedureParamController extends BaseController {

  private final ProcedureLogParamService procedureLogParamService;

  ProcedureParamController(
          final ConversionService conversionService,
          final ProcedureLogParamService procedureLogParamService
  ) {
    super(conversionService);
    this.procedureLogParamService = procedureLogParamService;
  }

  /**
   * Fetches the list of procedure params filtered by the procedure id.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of procedure params stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public PageableResponse<ProcedureLogParamDto> getProcedureParamsByProcedureId(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
          @RequestHeader(PAGEABLE_PROPERTIES) PageableProperties pageableProperties,
          @RequestParam String procedureId
  ) {
    return new PageableResponse<>(
            pageableProperties,
            procedureLogParamService.getProcedureLogParamsByProcedureId(Long.valueOf(procedureId))
    );
  }
}
