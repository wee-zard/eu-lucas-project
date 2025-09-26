package com.lucas.spring.components.procedure.service;

import com.lucas.spring.components.procedure.model.dto.ProcedureLogParamDto;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogParamEntity;
import java.util.List;

/**
 * Stores methods related to the {@link ProcedureLogParamEntity}.
 */
public interface ProcedureLogParamService {

  /**
   * Fetches the list of procedure params.
   *
   * @return Returns the list of procedure params.
   */
  List<ProcedureLogParamDto> getProcedureLogParamsByProcedureId();

  /**
   * Save the provided entity.
   *
   * @param entity The log we want to save.
   * @return Returns the saved entity.
   */
  ProcedureLogParamEntity saveProcedureLogParam(ProcedureLogParamEntity entity);
}
