package com.lucas.spring.components.folder.model.entity.embeddable;

import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

/**
 * Defines the embeddable primary keys of the {@link FolderContentEntity}.
 */
@Builder
@Getter
@ToString
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Component
public class EmbeddedFolderContentKey {

  /**
   * The folder that has content.
   */
  @Column(name = "folder_id")
  private Long folderId;

  /**
   * The image that has been applied to the folder.
   */
  @Column(name = "image_id")
  private Long imageId;
}
