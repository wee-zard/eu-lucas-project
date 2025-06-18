package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.SoftDeletableEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
 * Storing the most important information
 * related to the users.
 */
@ToString
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "User")
@Table(name = "tb_user_root")
public class UserEntity extends SoftDeletableEntity {
  /**
   * Stores the email address of the gmail account what the user is using.
   */
  @Column(name = "email_address", length = 1155, nullable = false)
  private String emailAddress;

  /**
   * The username, or the full name of the user who uses
   * the gmail account. It is set automatically by the system.
   * */
  @Column(name = "username", length = 100)
  private String userName;

  /**
   * Stores a base64 string of the resource of the profile picture what the
   * Google itself is managing.
   */
  @Column(name = "profile_picture", columnDefinition = "TEXT")
  private String profilePictureBase64;

  /**
   * The status of the actual user.
   */
  @ManyToOne
  @JoinColumn(name = "status_id", nullable = false)
  private StatusEntity status;

  /**
   * Describes the role of the user.
   */
  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  private RoleEntity role;

  /**
   * List of folders what the user is owning.
   */
  @OneToMany(mappedBy = "owner")
  private Set<FolderEntity> ownFolders;

  /**
   * The folders that has been shared with the user.
   * These folders are not owned by the user.
   */
  @OneToMany(mappedBy = "sharedWith")
  private Set<ShareFolderEntity> sharedFolders;
}
