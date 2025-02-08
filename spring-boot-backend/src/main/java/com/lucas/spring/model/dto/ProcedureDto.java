package com.lucas.spring.model.dto;

import com.lucas.spring.model.dto.abstraction.RootDto;
import com.lucas.spring.model.entity.ProcedureEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link ProcedureEntity} entities for the purpose
 * of sending back to the frontend no sensitive data.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class ProcedureDto implements RootDto {
  private Long id;
  private String name;
  private String initUserName;
}
