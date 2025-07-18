package com.lucas.spring.components.year.model.entity;

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
import lombok.Setter;
import lombok.ToString;

/**
 * The year when the image was created.
 */
@Data
@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CreationYear")
@Table(name = "tb_creation_year")
public class CreationYearEntity extends BaseComparatorEntity<CreationYearEntity> {
  @Id
  @Column(name = "year", length = 4, nullable = false)
  private int year;

  @Override
  public boolean equals(final Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreationYearEntity that = (CreationYearEntity) o;
    return year == that.year;
  }

  @Override
  public int hashCode() {
    return Objects.hash(year);
  }

  /**
   * Defines the comparison between two {@link CreationYearEntity} type object.
   *
   * @param creationYearEntity The object to compare with.
   * @return an int.
   */
  @Override
  public int compareTo(final CreationYearEntity creationYearEntity) {
    return Integer.compare(getYear(), creationYearEntity.getYear());
  }
}
