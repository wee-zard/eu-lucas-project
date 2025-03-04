package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.ProcedureEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.repositories.ProcedureRepository;
import com.lucas.spring.services.service.ProcedureService;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link ProcedureService}.
 */
@Service
@AllArgsConstructor
public class ProcedureServiceImpl implements ProcedureService {
  private final ProcedureRepository procedureRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public void deleteAll() {
    procedureRepository.deleteAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureEntity createProcedure(final String name, final UserEntity user) {
    return procedureRepository.save(ProcedureEntity.builder().name(name).initUserId(user).build());
  }

  @Override
  public List<ProcedureEntity> getProcedures() {
    return procedureRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public Optional<ProcedureEntity> getProcedureByName(final String name) {
    return procedureRepository.getNameByName(name);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureEntity getProcedureByNameAndInitIfNotExists(
          final String name,
          final UserEntity user
  ) {
    return getProcedureByName(name).orElseGet(() -> createProcedure(name, user));
  }
}
