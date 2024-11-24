package com.lucas.spring.model.entity.abstraction;

import jakarta.persistence.Column;
import lombok.Getter;

/**
 * An entity which is used to store the deletion time of the entity
 * while the entity itself is not deleted.
 */
@Getter
public abstract class SoftDeletableEntity extends AuditedEntity {
  @Column
  private String deletedAt;
  @Column
  private Long deletedBy;
}
