package com.lucas.spring_boot.model_layer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CreationYear")
@Table(name = "creation_year")
public class CreationYearEntity {
    @Id
    @Column(name = "year", length = 4, nullable = false)
    public int year;

    @Override
    public String toString() {
        return "CreationYearEntity{" +
                "year=" + year +
                '}';
    }
}
