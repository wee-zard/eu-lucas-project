package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
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
@Entity(name = "PlantName")
@Table(name = "tb_plant_name")
@Inheritance(strategy = InheritanceType.JOINED)
public class PlantNameEntity {
  public static final int PLANT_NAME_LENGTH = 200;
  @Id
  @Column(name = "plant_scientific_name", length = PLANT_NAME_LENGTH, nullable = false, columnDefinition = "TEXT")
  private String plantScientificName;
}
