package com.lucas.spring.components.procedure.model.dto;

import com.lucas.spring.commons.model.dto.RootDto;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link ProcedureLogEntity} entities for the purpose
 * of sending back to the frontend not sensitive data.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class ProcedureLogDto implements RootDto {
  private Number id;
  private String createdAt;
  private List<String> params;
  private List<BoundingBoxDto> boundingBoxes;
  private String procedure;
  private String user;
}
