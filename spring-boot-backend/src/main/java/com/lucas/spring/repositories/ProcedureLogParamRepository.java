package com.lucas.spring.repositories;

import com.lucas.spring.model.dto.ProcedureLogParamDto;
import com.lucas.spring.model.entity.ProcedureLogParamEntity;
import com.lucas.spring.model.entity.embeddable.EmbeddedProcedureLogParam;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Repository of the {@link ProcedureLogParamEntity}.
 */
@Repository
public interface ProcedureLogParamRepository
        extends JpaRepository<ProcedureLogParamEntity, EmbeddedProcedureLogParam> {

  /**
   * Fetch the list of procedure params that are associated with the provided procedure.
   *
   * @param id The id of the procedure to filter by.
   * @return Returns the list of those procedure params that are associated with the procedure.
   */
  @Query("SELECT new com.lucas.spring.model.dto.ProcedureLogParamDto("
          + "p.procedureLogParam.procedureParamName"
          + ") FROM ProcedureLogParam p "
          + "WHERE p.procedureLogParam.procedureLog.procedure.id = :id "
          + "GROUP BY p.procedureLogParam.procedureParamName")
  List<ProcedureLogParamDto> findByProcedureParamName(@Param("id") Long id);
}
