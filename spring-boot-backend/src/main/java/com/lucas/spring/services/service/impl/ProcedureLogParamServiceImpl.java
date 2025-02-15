package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.dto.ProcedureLogParamDto;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import com.lucas.spring.repositories.ProcedureLogParamRepository;
import com.lucas.spring.services.service.ProcedureLogParamService;
import java.util.List;
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
  public List<ProcedureLogParamDto> getProcedureLogParamsByProcedureId() {
    return procedureLogParamRepository.findByProcedureParamName();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureLogParamEntity saveProcedureLogParam(final ProcedureLogParamEntity entity) {
    return procedureLogParamRepository.save(entity);
  }
}
