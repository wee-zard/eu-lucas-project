package com.lucas.spring.model.entity.embeddable;

import com.lucas.spring.model.entity.PlantNameEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Defines a compact primary key that holds two columns of
 * a table, while one of them is in relation with the table
 * via a foreign key relation.
 */
@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddablePlanetCommonName {
  /**
   * The common name of the plant.
   */
  @Column(name = "plant_common_name", length = PlantNameEntity.PLANT_NAME_LENGTH, nullable = false, columnDefinition = "TEXT")
  private String plantCommonName;
  /**
   * A foreign key reference to the scientific name of the plant.
   */
  @ManyToOne
  @JoinColumn(name = "plant_scientific_name")
  private PlantNameEntity plantScientificName;
}
