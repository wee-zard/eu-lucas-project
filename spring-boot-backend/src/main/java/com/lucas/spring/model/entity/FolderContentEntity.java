package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.embeddable.EmbeddedFolderContentKey;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

/**
 * Shared folder entities.
 */
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity(name = "FolderContent")
@Table(name = "tb_folder_content")
public class FolderContentEntity {

  @EmbeddedId
  private EmbeddedFolderContentKey id;

  @ManyToOne(fetch = FetchType.LAZY)
  @MapsId("folderId")
  @JoinColumn(name = "folder_id")
  private FolderEntity folder;

  @ManyToOne(fetch = FetchType.LAZY)
  @MapsId("imageId")
  @JoinColumn(name = "image_id")
  private ImageEntity image;

  /**
   * The query builders which was used to fetch the images
   * from the remote server.
   */
  @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @JoinColumn(name = "query_builder_id", referencedColumnName = "id")
  private QueryBuilderEntity queryBuilder;
}
