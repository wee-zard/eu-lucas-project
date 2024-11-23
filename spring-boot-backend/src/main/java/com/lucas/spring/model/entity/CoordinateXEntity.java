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

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CoordinateX")
@Table(name = "tb_coordinate_x")
public class CoordinateXEntity {
    @Id
    @Column(name = "coordinate_x", length = 3, nullable = false)
    private Integer coordinateX;

    @Override
    public String toString() {
        return "CoordinateXEntity{" +
                "coordinateX=" + coordinateX +
                '}';
    }
}
