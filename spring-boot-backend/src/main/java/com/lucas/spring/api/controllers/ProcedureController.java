package com.lucas.spring.api.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.request.procedures.ProcedureResultRequest;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.services.facade.ProcedureFacade;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the procedures,
 * such as uploading procedure logs, or creating & modifying
 * procedures and their logs.
 */
@RestController
@RequestMapping(path = "api/procedure")
@AllArgsConstructor
public class ProcedureController {
  private final ProcedureFacade procedureFacade;

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
}
