package com.lucas.spring.components.procedure.service.impl;

import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.procedure.repository.ProcedureRepository;
import com.lucas.spring.components.procedure.service.ProcedureService;
import com.lucas.spring.components.user.model.entity.UserEntity;
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
  public ProcedureEntity createProcedure(
          final String name,
          final UserEntity user,
          final String author
  ) {
    return procedureRepository.save(ProcedureEntity.builder()
                    .name(name).initUserId(user).author(author)
                    .build());
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
          final UserEntity user,
          final String author
  ) {
    return getProcedureByName(name).orElseGet(() -> createProcedure(name, user, author));
  }
}
