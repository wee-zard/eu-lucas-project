package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.BaseComparatorEntity;
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

@Data
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CoordinateY")
@Table(name = "tb_coordinate_y")
public class CoordinateYEntity extends BaseComparatorEntity<CoordinateYEntity> {
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
    CoordinateYEntity that = (CoordinateYEntity) o;
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
  public int compareTo(CoordinateYEntity object) {
    return Integer.compare(getCoordinateY(), object.getCoordinateY());
  }
}
