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
@Entity(name = "CreationDirection")
@Table(name = "tb_creation_direction")
public class CreationDirectionEntity {
    @Id
    @Column(name = "direction_name", length = 20, nullable = false, columnDefinition = "TEXT")
    public String directionName;

    @Override
    public String toString() {
        return "CreationDirection{" +
                "directionName='" + directionName + '\'' +
                '}';
    }
}
