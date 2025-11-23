package com.lucas.spring.components.procedure;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.components.procedure.facade.ProcedureFacade;
import com.lucas.spring.components.procedure.model.dto.ProcedureDto;
import com.lucas.spring.components.procedure.model.model.ProcedureResultRequest;
import com.lucas.spring.components.procedure.service.ProcedureService;
import java.util.List;
import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@RequestMapping(path = "api/procedure")
public class ProcedureController {
  private final ProcedureFacade procedureFacade;
  private final ProcedureService procedureService;
  private final CustomConversionService conversionService;

  /**
   * Upload a parsed xml object into the server that contains the
   * results of a procedure that analyzed an image.
   *
   * @param user The user who initiated the request.
   */
  @CrossOrigin
  @PostMapping("/upload")
  public BaseResponse postValidateEmailAddress(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
          @RequestBody final List<ProcedureResultRequest> requests
  ) {
    requests.forEach(request -> procedureFacade.uploadLog(request, user.getUserId()));
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
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser authenticatedUser
  ) {
    return conversionService.convert(
            procedureService.getProcedures(),
            ProcedureDto.class
    );
  }
}
