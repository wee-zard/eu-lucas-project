package com.lucas.spring.database.repositories;

import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link ProcedureLogParamEntity}.
 */
@Repository
public interface ProcedureLogParamRepository extends CrudRepository<ProcedureLogParamEntity, Long> {
}
