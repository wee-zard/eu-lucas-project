package com.lucas.spring.components.procedure.facade;

import com.lucas.spring.components.procedure.model.model.ProcedureResultRequest;
import org.springframework.stereotype.Service;

/**
 * Handles the update, creation and modification of
 * procedure and procedure logs.
 */
@Service
public interface ProcedureFacade {
  /**
   * Inserts into the db the uploaded file.
   *
   * @param request The request that contains the uploaded xml file.
   * @param userId The is of the user who initiated the request.
   */
  void uploadLog(ProcedureResultRequest request, Long userId);
}
