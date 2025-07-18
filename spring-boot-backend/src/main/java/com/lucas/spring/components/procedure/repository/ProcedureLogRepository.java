package com.lucas.spring.components.procedure.repository;

import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository of the {@link ProcedureLogEntity}.
 */
public interface ProcedureLogRepository extends JpaRepository<ProcedureLogEntity, Long> {
}
