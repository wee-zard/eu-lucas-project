package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.ProcedureLogEntity;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import org.springframework.stereotype.Service;

/**
 * Stores methods related to the {@link ProcedureLogParamEntity}.
 */
@Service
public interface ProcedureLogParamService {

  /**
   * Save the provided entity.
   *
   * @param entity The log we want to save.
   * @return Returns the saved entity.
   */
  ProcedureLogParamEntity saveProcedureLogParam(ProcedureLogParamEntity entity);
}
