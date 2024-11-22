package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.embeddable.EmbeddablePlanetCommonName;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
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
@Entity(name = "PlantCommonName")
@Table(name = "tb_plant_common_name")
public class  PlantCommonNameEntity {
  @EmbeddedId
  private EmbeddablePlanetCommonName planetCommonNameId;
}
