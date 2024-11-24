package com.lucas.spring.model.entity.abstraction;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.*;

/**
 * An entity which is used to init the auto increment id column
 * of the different table entities.
 */
@Getter
@Setter
@MappedSuperclass
@ToString
@Data
public abstract class BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private final Long id;
}
