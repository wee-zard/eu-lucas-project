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
   * Fetch the list of procedure params.
   *
   * @return Returns the list of procedure params.
   */
  @Query("SELECT new com.lucas.spring.model.dto.ProcedureLogParamDto("
          + "p.procedureLogParam.procedureParamName"
          + ") FROM ProcedureLogParam p "
          + "GROUP BY p.procedureLogParam.procedureParamName")
  List<ProcedureLogParamDto> findByProcedureParamName();
}
