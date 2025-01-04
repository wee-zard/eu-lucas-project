package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.ProcedureLogEntity;
import org.springframework.data.repository.CrudRepository;

/**
 * Repository of the {@link ProcedureLogEntity}.
 */
public interface ProcedureLogRepository extends CrudRepository<ProcedureLogEntity, Long> {
}
