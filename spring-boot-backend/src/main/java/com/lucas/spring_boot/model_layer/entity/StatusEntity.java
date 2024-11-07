package com.lucas.spring_boot.model_layer.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Status")
@Table(name = "tb_status")
public class StatusEntity {
    @Id
    @Column(name = "status_id")
    public Long id;
    @Column(name = "status_name", length = 100)
    public String statusName;

    @Override
    public String toString() {
        return "StatusEntity{" +
                "id=" + id +
                ", statusName='" + statusName + '\'' +
                '}';
    }
}
