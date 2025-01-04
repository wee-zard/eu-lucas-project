package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.ProcedureLogParamRepository;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import com.lucas.spring.services.service.ProcedureLogParamService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link ProcedureLogParamService}.
 */
@Service
@AllArgsConstructor
public class ProcedureLogParamServiceImpl implements ProcedureLogParamService {
  private final ProcedureLogParamRepository procedureLogParamRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureLogParamEntity saveProcedureLogParam(ProcedureLogParamEntity entity) {
    return procedureLogParamRepository.save(entity);
  }
}
