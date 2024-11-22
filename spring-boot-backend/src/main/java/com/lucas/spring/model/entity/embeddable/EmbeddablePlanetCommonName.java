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

@Getter
@Setter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class EmbeddablePlanetCommonName {
  @Column(name = "plant_common_name", length = 200, nullable = false, columnDefinition = "TEXT")
  private String plantCommonName;
  @ManyToOne
  @JoinColumn(name = "plant_scientific_name")
  private PlantNameEntity plantScientificName;
}
