package com.lucas.spring.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Defines entities that are a family of plants.
 */
@Getter
@AllArgsConstructor
@Entity(name = "PlantSpecies")
@Table(name = "tb_plant_species")
public class PlantSpeciesEntity extends PlantNameEntity {
}
