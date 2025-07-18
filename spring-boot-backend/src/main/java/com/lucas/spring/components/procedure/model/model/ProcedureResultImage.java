package com.lucas.spring.components.procedure.model.model;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * TODO: Javadoc.
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcedureResultImage {
  private ProcedureResultFile file;
  private List<ProcedureResultObject> objects;
}
