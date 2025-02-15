package com.lucas.spring.services.service;

import com.lucas.spring.model.dto.ProcedureLogParamDto;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Stores methods related to the {@link ProcedureLogParamEntity}.
 */
@Service
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
