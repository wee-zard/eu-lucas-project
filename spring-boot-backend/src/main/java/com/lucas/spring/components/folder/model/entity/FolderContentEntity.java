package com.lucas.spring.components.folder.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

/**
 * Content of the folders.
 */
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity(name = "FolderContent")
@Table(name = "tb_folder_content")
public class FolderContentEntity extends BaseEntity {

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "folder_id")
  private FolderEntity folder;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "image_id")
  private ImageEntity image;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bounding_box_id")
  private BoundingBoxEntity boundingBox;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "content")
  private Set<FolderContentDataEntity> folderContentDataset;
}
