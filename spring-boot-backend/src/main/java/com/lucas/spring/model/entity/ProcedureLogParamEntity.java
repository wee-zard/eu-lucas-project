package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.embeddable.EmbeddedProcedureLogParam;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Store the params used in the procedures.
 */
@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ProcedureLogParam")
@Table(name = "tb_procedure_log_params")
public class ProcedureLogParamEntity {
  /**
   * The primary keys of the procedure log param entity,
   * from which one of them is in a many-to-one relationship
   * with the {@link ProcedureLogEntity}.
   */
  @EmbeddedId
  private EmbeddedProcedureLogParam procedureLogParam;
}
