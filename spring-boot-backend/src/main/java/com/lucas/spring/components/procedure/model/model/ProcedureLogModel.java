package com.lucas.spring.components.procedure.model.model;

import com.lucas.spring.components.procedure.model.dto.ProcedureLogDto;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * .
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class ProcedureLogModel {
  private ProcedureLogDto log;
  private Map<String, String> properties;
}
