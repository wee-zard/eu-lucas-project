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
@Entity(name = "Status")
@Table(name = "tb_status")
public class StatusEntity {
    @Id
    @Column(name = "status_id")
    private Long id;
    @Column(name = "status_name", length = 100)
    private String statusName;

    @Override
    public String toString() {
        return "StatusEntity{" +
                "id=" + id +
                ", statusName='" + statusName + '\'' +
                '}';
    }
}
