package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@Entity(name = "Plant")
@Table(name = "tb_plant")
public class PlantEntity extends PlantNameEntity {
    @Column(name = "is_plant_invasive", length = 1, nullable = false)
    private Boolean isPlantInvasive;

    @ManyToOne
    @JoinColumn(name = "plant_species_name")
    private PlantSpeciesEntity plantSpeciesName;

    @ManyToMany
    @JoinTable(
        name = "tb_plant_in_image",
        joinColumns = @JoinColumn(name = "image_plant_name"),
        inverseJoinColumns = @JoinColumn(name = "image_id")
    )
    private Set<ImageEntity> listOfImages;
}
