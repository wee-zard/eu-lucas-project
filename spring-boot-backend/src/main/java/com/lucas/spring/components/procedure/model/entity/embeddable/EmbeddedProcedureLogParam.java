package com.lucas.spring.components.procedure.model.entity.embeddable;

import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

/**
 * Defines a compact primary key that holds two columns of a table
 * while one of them is in relation with the table
 * via a foreign key relation.
 */
@Builder
@Getter
@ToString
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Component
public class EmbeddedProcedureLogParam {
  /**
   * The name of the param that is used in the procedure log.
   */
  @Column(name = "procedure_param_name", length = 50, nullable = false, columnDefinition = "TEXT")
  private String procedureParamName;
  /**
   * A foreign key reference to the procedure logs.
   */
  @ManyToOne
  @JoinColumn(name = "procedure_log_id")
  private ProcedureLogEntity procedureLog;
}
