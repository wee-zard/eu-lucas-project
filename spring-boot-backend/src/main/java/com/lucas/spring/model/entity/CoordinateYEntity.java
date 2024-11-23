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
@Entity(name = "CoordinateY")
@Table(name = "tb_coordinate_y")
public class CoordinateYEntity {
    @Id
    @Column(name = "coordinate_y", length = 3, nullable = false)
    private Integer coordinateY;

    @Override
    public String toString() {
        return "CoordinateYEntity{" +
                "coordinateY=" + coordinateY +
                '}';
    }
}
