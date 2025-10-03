package com.lucas.spring.components.email.model.entity;

import com.lucas.spring.commons.model.entity.AuditedEntity;
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

/**
 * Entity for the email types.
 */
@ToString
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Email")
@Table(name = "tb_email")
public class EmailEntity extends AuditedEntity {
  /**
   * The specific type of the email.
   */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "type", nullable = false)
  private EmailTypeEntity type;

  /**
   * The content of the email.
   */
  @Column(name = "content", nullable = false, columnDefinition = "TEXT")
  private String content;
}
