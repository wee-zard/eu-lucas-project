package com.lucas.spring.controllers;

import com.lucas.spring.controllers.abstraction.BaseController;
import com.lucas.spring.model.dto.ProcedureDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.procedures.ProcedureResultRequest;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.services.facade.ProcedureFacade;
import com.lucas.spring.services.service.ProcedureService;
import java.util.List;
import org.springframework.core.convert.ConversionService;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the procedures.
 */
@RestController
@RequestMapping(path = "api/procedure")
public class ProcedureController extends BaseController {
  private final ProcedureFacade procedureFacade;
  private final ProcedureService procedureService;

  ProcedureController(
          final ConversionService conversionService,
          final ProcedureFacade procedureFacade,
          final ProcedureService procedureService
  ) {
    super(conversionService);
    this.procedureFacade = procedureFacade;
    this.procedureService = procedureService;
  }

  /**
   * Upload a parsed xml object into the server that contains the
   * results of a procedure that analyzed an image.
   *
   * @param authenticatedUser The user who initiated the request.
   */
  @CrossOrigin
  @PostMapping("/upload")
  public BaseResponse postValidateEmailAddress(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
          @RequestBody final ProcedureResultRequest request
  ) {
    procedureFacade.uploadLog(request, authenticatedUser.getUserId());
    return new BaseResponse();
  }

  /**
   * Fetches the list of procedures.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of procedures stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<ProcedureDto> getProcedures(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return convertEntityToDto(procedureService.getProcedures(), ProcedureDto.class);
  }
}
