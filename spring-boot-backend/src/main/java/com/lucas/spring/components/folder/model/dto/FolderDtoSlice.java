package com.lucas.spring.components.folder.model.dto;

import com.lucas.spring.components.folder.model.entity.FolderEntity;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * A dto slice made out of {@link FolderEntity} entities for the purpose
 * of sending back to the frontend no sensitive data, but with more
 * less data stored inside them compared to the real dto.
 */
@Builder
@Getter
@ToString
@AllArgsConstructor
public class FolderDtoSlice {
  private Long id;
  private String title;
  private String ownerName;
  private Boolean isEditable;
  private Instant updatedAt;
}

