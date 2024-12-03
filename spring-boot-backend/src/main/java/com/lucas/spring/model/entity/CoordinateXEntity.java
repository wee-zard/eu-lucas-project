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
@Entity(name = "CoordinateX")
@Table(name = "tb_coordinate_x")
public class CoordinateXEntity extends BaseComparatorEntity<CoordinateXEntity> {
  @Id
  @Column(name = "coordinate_x", length = 3, nullable = false)
  private int coordinateX;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CoordinateXEntity that = (CoordinateXEntity) o;
    return Objects.equals(coordinateX, that.coordinateX);
  }

  @Override
  public int hashCode() {
    return Objects.hash(coordinateX);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public int compareTo(CoordinateXEntity object) {
    return Integer.compare(getCoordinateX(), object.getCoordinateX());
  }
}
