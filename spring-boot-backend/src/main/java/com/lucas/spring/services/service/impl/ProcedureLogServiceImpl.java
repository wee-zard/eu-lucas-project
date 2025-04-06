package com.lucas.spring.services.service.impl;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.entity.ProcedureEntity;
import com.lucas.spring.model.entity.ProcedureLogEntity;
import com.lucas.spring.model.entity.UserEntity;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.repositories.ProcedureLogRepository;
import com.lucas.spring.services.service.ProcedureLogService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;
import java.util.List;
import lombok.AllArgsConstructor;
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
  public List<ProcedureLogEntity> getProcedureLogsByImageId(
          final Number imageId,
          final PageableProperties pageableProperties
  ) {
    // Setting up the objects for the query builder.
    final CriteriaBuilder cb = entityManager.getCriteriaBuilder();
    final CriteriaQuery<ProcedureLogEntity> criteriaQuery = cb.createQuery(ProcedureLogEntity.class);
    final Root<ProcedureLogEntity> root = criteriaQuery.from(ProcedureLogEntity.class);

    // Query by the image id.
    criteriaQuery.select(root).where(cb.equal(
            root.get("image").get("id"),
            imageId
    ));
    final TypedQuery<ProcedureLogEntity> query = entityManager.createQuery(criteriaQuery);

    // Wrap the result into a list.
    query.setFirstResult(pageableProperties.getPageNo());
    query.setMaxResults(pageableProperties.getPageSize());
    return query.getResultList();
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
