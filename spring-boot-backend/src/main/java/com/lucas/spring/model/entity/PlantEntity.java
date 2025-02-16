package com.lucas.spring.model.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.Setter;

/**
 * Defines the structure of the Plant entity
 * and the plant table represent in the db.
 */
@Getter
@Setter
@Entity(name = "Plant")
@Table(name = "tb_plant")
@PrimaryKeyJoinColumn(name = "plantScientificName")
public class PlantEntity extends PlantNameEntity {
  /**
   * Tells whether the plant is invasive or not.
   */
  @Column(name = "is_plant_invasive", length = 1, nullable = false)
  private Boolean isPlantInvasive;
  /**
   * Stores the species category of the plant.
   */
  @ManyToOne
  @JoinColumn(name = "plant_species_name")
  private PlantSpeciesEntity plantSpeciesName;
  /**
   * Stores the images that have been associated
   * with this plant.
   * <a href="https://www.baeldung.com/jpa-many-to-many">Many-to-Man relations implementation</a>
   */
  @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
  @JoinTable(
      name = "tb_plant_in_image",
      joinColumns = @JoinColumn(name = "image_plant_name"),
      inverseJoinColumns = @JoinColumn(name = "image_id")
  )
  private Set<ImageEntity> listOfImages;

  /**
   * Init all the attributes of the entity.
   */
  public PlantEntity(
        String plantScientificName,
        Boolean isPlantInvasive,
        PlantSpeciesEntity plantSpeciesName,
        Set<ImageEntity> listOfImages
  ) {
    super(plantScientificName);
    this.isPlantInvasive = isPlantInvasive;
    this.plantSpeciesName = plantSpeciesName;
    this.listOfImages = listOfImages;
  }

  /**
   * Init all the attributes of the entity.
   */
  public PlantEntity(
        String plantScientificName,
        Boolean isPlantInvasive
  ) {
    super(plantScientificName);
    this.isPlantInvasive = isPlantInvasive;
    this.plantSpeciesName = null;
    this.listOfImages = new HashSet<>();
  }

  /**
   * Init all the attributes of the entity.
   */
  public PlantEntity() {
    super();
    this.isPlantInvasive = null;
    this.plantSpeciesName = null;
    this.listOfImages = new HashSet<>();
  }
}
