package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.AuditedEntity;
import jakarta.persistence.Column;
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
import lombok.Setter;
import lombok.ToString;

/**
 * Entity of the folder table.
 */
@ToString
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Folder")
@Table(name = "tb_folder")
public class FolderEntity extends AuditedEntity {

  /**
   * Constructs an entity with only an id in it.
   *
   * @param id The id of the entity.
   */
  public FolderEntity(Long id) {
    setId(id);
  }

  /**
   * Stores title of the folder.
   */

  @Column(name = "title", length = 100, nullable = false)
  private String title;

  /**
   * Stores description of the folder.
   */
  @Column(name = "description", length = 500)
  private String description;

  /**
   * The user who owns the folder.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "owner_user_id", nullable = false)
  private UserEntity owner;

  /**
   * The folders that has been shared with other users.
   */
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "sharedFolder")
  private Set<ShareFolderEntity> sharedFoldersWith;

  /**
   * The content of the given folder. Inside the folder the
   * users could store different images that has been fetched
   * by queries.
   */
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "folder")
  private Set<FolderContentEntity> folderContents;
}
