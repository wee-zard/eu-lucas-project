package com.lucas.spring.model.entity.abstraction;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.experimental.SuperBuilder;

/**
 * An entity which is used to store the deletion time of the entity
 * while the entity itself is not deleted.
 */
@Getter
@SuperBuilder
public abstract class SoftDeletableEntity extends AuditedEntity {
  @Column
  private String deletedAt;
  @Column
  private Long deletedBy;
}
