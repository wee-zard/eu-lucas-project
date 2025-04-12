package com.lucas.spring.model.request.procedures;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcedureResultFileRequest {
  private List<ProcedureResultFile> files;
}
