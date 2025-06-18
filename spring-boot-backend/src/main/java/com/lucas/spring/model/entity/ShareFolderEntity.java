package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.embeddable.EmbeddedSharedFolderKey;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
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
@Entity(name = "ShareFolder")
@Table(name = "tb_share_folder")
public class ShareFolderEntity {

  @EmbeddedId
  private EmbeddedSharedFolderKey id;

  @ManyToOne
  @MapsId("folderId")
  @JoinColumn(name = "folder_id")
  private FolderEntity sharedFolder;

  @ManyToOne
  @MapsId("sharedWithUserId")
  @JoinColumn(name = "shared_with_user_id")
  private UserEntity sharedWith;

  /**
   * Tells what permission is granted to the user by sharing
   * the folder with them. If the permission is set to be
   * not editable, then they have only read-only rights,
   * else they can read-edit-delete
   */
  @Column(name = "is_editable", nullable = false)
  private Boolean isEditable;

  /**
   * The creation time of the entity.
   */
  @CreationTimestamp
  @Column(name = "created_at")
  private Instant createdAt;

  /**
   * The update time of the entity.
   */
  @UpdateTimestamp
  @Column(name = "updated_at")
  private Instant updatedAt;
}
