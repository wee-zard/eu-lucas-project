package com.lucas.spring.services.service.impl;

import com.lucas.spring.repositories.ProcedureLogRepository;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.ProcedureEntity;
import com.lucas.spring.model.entity.ProcedureLogEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.services.service.ProcedureLogService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link ProcedureLogService}.
 */
@Service
@AllArgsConstructor
public class ProcedureLogServiceImpl implements ProcedureLogService {
  private final ProcedureLogRepository procedureLogRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureLogEntity createProcedureLog(
          final ProcedureEntity procedure,
          final ImageEntity image,
          final UserEntity user
  ) {
    return saveProcedureLog(
            ProcedureLogEntity.builder()
                    .procedure(procedure)
                    .image(image)
                    .user(user)
                    .build()
    );
  }

  @Override
  public ProcedureLogEntity saveProcedureLog(ProcedureLogEntity entity) {
    return procedureLogRepository.save(entity);
  }
}
