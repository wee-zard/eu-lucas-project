package com.lucas.spring.controllers;

import com.lucas.spring.helper.helper.ConversionHelper;
import com.lucas.spring.model.dto.ProcedureDto;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.procedures.ProcedureResultRequest;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.services.facade.ProcedureFacade;
import com.lucas.spring.services.service.ProcedureService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@AllArgsConstructor
@RequestMapping(path = "api/procedure")
public class ProcedureController {
  private final ProcedureFacade procedureFacade;
  private final ProcedureService procedureService;
  private final ConversionHelper conversionHelper;

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
    return conversionHelper.convertEntityToDto(
            procedureService.getProcedures(),
            ProcedureDto.class
    );
  }

  /**
   * Remove specific procedure from the db.
   */
  @CrossOrigin
  @DeleteMapping("/delete-all")
  public BaseResponse deleteProcedure(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    procedureService.deleteAll();
    return new BaseResponse();
  }
}
