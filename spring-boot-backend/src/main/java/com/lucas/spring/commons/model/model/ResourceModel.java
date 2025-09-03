package com.lucas.spring.commons.model.model;

import lombok.Builder;
import lombok.Data;
import lombok.ToString;

/**
 * A dynamical object that holds files that should be sent back
 * to the frontend. The class mainly stores the filenames, and the
 * base64string version of the files.
 */
@ToString
@Data
@Builder
public class ResourceModel {
  private String filename;
  private String base64;
}
