package com.lucas.spring.components.email.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Entity(name = "EmailType")
@Table(name = "tb_email_type")
public class EmailTypeEntity extends BaseEntity {
  /**
   * Sets the id of the entity by thee provided param.
   *
   * @param id The id of the entity.
   */
  public EmailTypeEntity(Long id) {
    setId(id);
  }

  /**
   * The name of the specific email type.
   */
  @Column(name = "name", nullable = false, length = 50)
  private String name;
}
