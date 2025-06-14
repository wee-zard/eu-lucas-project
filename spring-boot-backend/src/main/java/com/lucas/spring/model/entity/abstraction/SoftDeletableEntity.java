package com.lucas.spring.model.entity.abstraction;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import java.time.Instant;
import lombok.Getter;
import lombok.Setter;

/**
 * An entity which is used to store the deletion time of the entity
 * while the entity itself is not deleted.
 */
@Getter
@Setter
@MappedSuperclass
public abstract class SoftDeletableEntity extends AuditedEntity {
  /**
   * The deletion time of the entity.
   */
  @Column(name = "deleted_at")
  private Instant deletedAt;
  /**
   * The one who deleted this entity.
   */
  @Column(name = "deleted_by")
  private Long deletedBy;
}
