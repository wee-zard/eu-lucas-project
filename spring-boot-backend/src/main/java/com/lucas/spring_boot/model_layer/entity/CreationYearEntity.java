package com.lucas.spring_boot.model_layer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Objects;

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
    public int year;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CreationYearEntity that = (CreationYearEntity) o;
        return year == that.year;
    }

    @Override
    public int hashCode() {
        return Objects.hash(year);
    }

    @Override
    public String toString() {
        return "CreationYearEntity{" +
                "year=" + year +
                '}';
    }
}
