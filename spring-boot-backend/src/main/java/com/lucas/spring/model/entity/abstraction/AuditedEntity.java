package com.lucas.spring.model.entity.abstraction;

import jakarta.persistence.Column;
import java.util.Date;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * An entity for the purpose of auditing the entity.
 * Storing and referring to the creation time and update time
 * of the entity.
 */
@Getter
@SuperBuilder
public abstract class AuditedEntity extends BaseEntity {
  /**
   * The creation time of the entity.
   */
  @Column
  @CreationTimestamp
  private Date createdAt;
  /**
   * The update time of the entity.
   */
  @Column
  @UpdateTimestamp
  private Date updatedAt;
}
