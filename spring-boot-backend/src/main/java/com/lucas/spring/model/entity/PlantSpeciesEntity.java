package com.lucas.spring.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Entity(name = "PlantSpecies")
@Table(name = "tb_plant_species")
public class PlantSpeciesEntity extends PlantNameEntity {
}
