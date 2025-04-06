package com.lucas.spring.repositories;

import com.lucas.spring.model.entity.ProcedureLogEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository of the {@link ProcedureLogEntity}.
 */
public interface ProcedureLogRepository extends JpaRepository<ProcedureLogEntity, Long> {
}
