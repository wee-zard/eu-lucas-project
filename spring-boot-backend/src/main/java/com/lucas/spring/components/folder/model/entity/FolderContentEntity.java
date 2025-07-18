package com.lucas.spring.components.folder.model.entity;

import com.lucas.spring.components.folder.model.entity.embeddable.EmbeddedFolderContentKey;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
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
