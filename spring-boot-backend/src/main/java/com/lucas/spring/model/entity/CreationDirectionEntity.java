package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Storing the most important information
 * related to the Creation Directions.
 */
@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CreationDirection")
@Table(name = "tb_creation_direction")
public class CreationDirectionEntity {
  @Id
  @Column(name = "direction_name", length = 20, nullable = false, columnDefinition = "TEXT")
  private String directionName;

  @Override
  public final String toString() {
    return String.format("CreationDirection{directionName='%s'}", directionName);
  }
}
