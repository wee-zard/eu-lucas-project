package com.lucas.spring.components.coordinate.y.model.entity;

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
 * Y-th GPD coordinates of the images.
 */
@Data
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CoordinateY")
@Table(name = "tb_coordinate_y")
public class CoordinateYthEntity extends BaseComparatorEntity<CoordinateYthEntity> {
  @Id
  @Column(name = "coordinate_y", length = 3, nullable = false)
  private int coordinateY;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CoordinateYthEntity that = (CoordinateYthEntity) o;
    return Objects.equals(coordinateY, that.coordinateY);
  }

  @Override
  public int hashCode() {
    return Objects.hash(coordinateY);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public int compareTo(CoordinateYthEntity object) {
    return Integer.compare(getCoordinateY(), object.getCoordinateY());
  }
}
