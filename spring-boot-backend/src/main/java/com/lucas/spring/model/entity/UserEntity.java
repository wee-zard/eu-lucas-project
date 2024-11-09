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
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

/**
 * Storing the most important information
 * related to the users.
 */
@Data
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
  @Column(name = "user_id")
  public Long id;
  @Column(name = "auth_token", length = 256)
  public String authToken;
  @Column(name = "email_address", length = 1155, nullable = false)
  public String emailAddress;
  @Column(name = "username", length = 100)
  public String userName;
  @CreationTimestamp
  public Instant creationTime;
  @ManyToOne
  @JoinColumn(name = "status_id", nullable = false)
  public StatusEntity status;

  @Override
  public String toString() {
    return "UserEntity{"
              + "id=" + id
              + ", authToken='" + authToken + '\''
              + ", emailAddress='" + emailAddress + '\''
              + ", userName='" + userName + '\''
              + ", creationTime=" + creationTime
              + ", status=" + status
              + '}';
  }
}
