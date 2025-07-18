package com.lucas.spring.components.procedure;

import com.lucas.spring.commons.helper.ConversionHelper;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.components.procedure.model.dto.ProcedureLogParamDto;
import com.lucas.spring.components.procedure.service.ProcedureLogParamService;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the procedure params.
 */
@RestController
@AllArgsConstructor
@RequestMapping(path = "api/procedure-param")
public class ProcedureParamController {

  private final ProcedureLogParamService procedureLogParamService;
  private final ConversionHelper conversionHelper;

  /**
   * Fetches the list of procedure params filtered by the procedure id.
   *
   * @param authenticatedUser The user who initiated the request.
   * @return Returns the list of procedure params stored in the server.
   */
  @CrossOrigin
  @GetMapping("/")
  public List<ProcedureLogParamDto> getProcedureParamsByProcedureId(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    return conversionHelper.convertList(
            procedureLogParamService.getProcedureLogParamsByProcedureId(),
            ProcedureLogParamDto.class);
  }
}
