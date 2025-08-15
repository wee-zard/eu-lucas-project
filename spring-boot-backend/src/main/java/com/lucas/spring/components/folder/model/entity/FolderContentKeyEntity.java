package com.lucas.spring.components.folder.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
 * Key entities.
 */
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Component
@Entity(name = "FolderContentKey")
@Table(name = "tb_folder_content_key")
public class FolderContentKeyEntity extends BaseEntity {

  /**
   * The name of the unique key.
   */
  @Column(name = "name", nullable = false, length = 100)
  private String name;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "key")
  private Set<FolderContentDataEntity> folderContentDataset;
}
