package com.lucas.spring.model.entity;

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

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CreationYear")
@Table(name = "tb_creation_year")
public class CreationYearEntity {
  @Id
  @Column(name = "year", length = 4, nullable = false)
  private int year;

  @Override
  public boolean equals(Object o) {
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

  @Override
  public String toString() {
    return "CreationYearEntity{"
            + "year=" + year
            + '}';
  }
}
