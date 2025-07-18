package com.lucas.spring.components.procedure.model.entity;

import com.lucas.spring.commons.model.entity.BaseComparatorEntity;
import com.lucas.spring.components.procedure.model.entity.embeddable.EmbeddedProcedureLogParam;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * Store the params used in the procedures.
 */
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ProcedureLogParam")
@Table(name = "tb_procedure_log_params")
public class ProcedureLogParamEntity extends BaseComparatorEntity<ProcedureLogParamEntity> {
  /**
   * The primary keys of the procedure log param entity,
   * from which one of them is in a many-to-one relationship
   * with the {@link ProcedureLogEntity}.
   */
  @EmbeddedId
  private EmbeddedProcedureLogParam procedureLogParam;

  @Override
  public boolean equals(final Object o) {
    return false;
  }

  @Override
  public int hashCode() {
    return 0;
  }

  @Override
  public int compareTo(ProcedureLogParamEntity o) {
    return String.CASE_INSENSITIVE_ORDER.compare(
            procedureLogParam.getProcedureParamName(),
            o.getProcedureLogParam().getProcedureParamName()
    );
  }
}
