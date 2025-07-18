package com.lucas.spring.components.procedure.service.impl;

import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import com.lucas.spring.components.procedure.repository.ProcedureLogRepository;
import com.lucas.spring.components.procedure.service.ProcedureLogService;
import com.lucas.spring.components.user.model.entity.UserEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
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
    final CriteriaQuery<ProcedureLogEntity> criteriaQuery =
            cb.createQuery(ProcedureLogEntity.class);
    final Root<ProcedureLogEntity> root = criteriaQuery.from(ProcedureLogEntity.class);

    // Query by the image id.
    criteriaQuery.select(root).where(cb.equal(root.get("image").get("id"), imageId));
    final TypedQuery<ProcedureLogEntity> query = entityManager.createQuery(criteriaQuery);
    final int maxResult = entityManager.createQuery(criteriaQuery).getMaxResults();

    // Wrap these values into a Pageable Request.
    query.setFirstResult((int) pageable.getOffset());
    query.setMaxResults(pageable.getPageSize());

    return PageableExecutionUtils.getPage(query.getResultList(), pageable, () -> maxResult);
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

  @Override
  public ProcedureLogEntity saveProcedureLog(ProcedureLogEntity entity) {
    return procedureLogRepository.save(entity);
  }
}
