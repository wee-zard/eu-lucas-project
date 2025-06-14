package com.lucas.spring.model.entity.abstraction;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import java.time.Instant;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * An entity for the purpose of auditing the entity.
 * Storing and referring to the creation time and update time
 * of the entity.
 */
@Getter
@MappedSuperclass
public abstract class AuditedEntity extends BaseEntity {
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
