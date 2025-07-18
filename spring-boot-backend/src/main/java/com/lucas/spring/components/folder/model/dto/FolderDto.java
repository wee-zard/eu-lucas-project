package com.lucas.spring.components.folder.model.dto;

import com.lucas.spring.components.folder.model.entity.FolderEntity;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto made out of {@link FolderEntity} entities for the purpose
 * of sending back to the frontend no sensitive data.
 */
@ToString
@Builder
@Getter
@AllArgsConstructor
public class FolderDto {
  private Long id;
  private String title;
  private String description;
  private int folderContentSize;
  private Instant createdAt;
  private Instant updatedAt;
}
