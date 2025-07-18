package com.lucas.spring.components.plant.model.entity;

import com.lucas.spring.components.plant.model.entity.embeddable.EmbeddablePlanetCommonName;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * Common plant name entity.
 */
@Builder
@Getter
@AllArgsConstructor
@Entity(name = "PlantCommonName")
@Table(name = "tb_plant_common_name")
public class  PlantCommonNameEntity {
  @EmbeddedId
  private EmbeddablePlanetCommonName planetCommonNameId;
}
