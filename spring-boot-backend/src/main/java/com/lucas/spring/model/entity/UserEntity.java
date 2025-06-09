package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.Instant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

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
public class UserEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

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
   * Stores the creation times of the user. This property
   * does not need to be provided, as it is automatically
   * added to the records before inserting them into the db.
   * It is set automatically by the system.
   */
  @CreationTimestamp
  private Instant creationTime;

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
}
