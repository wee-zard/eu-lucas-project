package com.lucas.spring.components.direction.model.entity;

import com.lucas.spring.commons.model.entity.BaseComparatorEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Storing the most important information
 * related to the Creation Directions.
 */
@Data
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CreationDirection")
@Table(name = "tb_creation_direction")
public class CreationDirectionEntity extends BaseComparatorEntity<CreationDirectionEntity> {
  @Id
  @Column(name = "direction_name", length = 20, nullable = false, columnDefinition = "TEXT")
  private String directionName;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreationDirectionEntity that = (CreationDirectionEntity) o;
    return Objects.equals(directionName, that.directionName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(directionName);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public int compareTo(CreationDirectionEntity object) {
    return String.CASE_INSENSITIVE_ORDER.compare(getDirectionName(), object.getDirectionName());
  }
}
