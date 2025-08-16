package com.lucas.spring.components.procedure.service.impl;

import com.lucas.spring.commons.utils.CriteriaBuilderHelper;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import com.lucas.spring.components.procedure.repository.ProcedureLogRepository;
import com.lucas.spring.components.procedure.service.ProcedureLogService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Implements the methods of the {@link ProcedureLogService}.
 */
@Service
@AllArgsConstructor
public class ProcedureLogServiceImpl implements ProcedureLogService {
  private final EntityManager entityManager;
  private final ProcedureLogRepository procedureLogRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  public Page<ProcedureLogEntity> getProcedureLogsByImageId(
          final Number imageId,
          final Pageable pageable
  ) {
    // Setting up the objects for the query builder.
    final CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    final CriteriaQuery<ProcedureLogEntity> qc = cb.createQuery(ProcedureLogEntity.class);
    final Root<ProcedureLogEntity> root = qc.from(ProcedureLogEntity.class);

    // Query by the image id.
    qc.select(root).where(cb.equal(root.get("image").get("id"), imageId));

    return CriteriaBuilderHelper.getPagedResult(qc, cb, root, pageable, entityManager);
  }

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

  /**
   * {@inheritDoc}
   */
  @Override
  public ProcedureLogEntity saveProcedureLog(ProcedureLogEntity entity) {
    return procedureLogRepository.save(entity);
  }
}
