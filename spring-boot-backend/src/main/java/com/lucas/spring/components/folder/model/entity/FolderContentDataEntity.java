package com.lucas.spring.components.folder.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

/**
 * The modifier properties of the bounding boxes inside the folders.
 */
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity(name = "FolderContentData")
@Table(name = "tb_folder_content_data")
public class FolderContentDataEntity extends BaseEntity {

  /**
   * The name of the unique key.
   */
  @Column(name = "folder_content_value", nullable = false, length = 100)
  private String value;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "folder_content_id")
  private FolderContentEntity content;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "folder_content_key")
  private FolderContentKeyEntity key;
}
