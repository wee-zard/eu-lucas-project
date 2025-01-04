package com.lucas.spring.model.request.procedures;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * Stores the logs of the procedures what the users uploaded
 * in the frontend side. It is containing values related to the
 * procedure, the image, and the results.
 */
@ToString
@Getter
@AllArgsConstructor
public class ProcedureResultRequest {

  /**
   * The time when the log have been created.
   * It should be in an ISO format without the letters.
   */
  private String timestamp;

  /**
   * The name of the unique procedure that have been used on the image.
   */
  private String method;

  /**
   * The params that have been applied on the procedure.
   */
  private List<String> params;

  /**
   * Defines the details about the file that have been used with the procedure.
   */
  private ProcedureResultFile file;

  /**
   * The bounding boxes that stores the found anomalies on the images.
   */
  private List<ProcedureResultObject> objects;
}
