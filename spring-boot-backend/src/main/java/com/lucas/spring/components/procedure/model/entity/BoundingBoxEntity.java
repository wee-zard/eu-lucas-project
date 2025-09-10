package com.lucas.spring.components.procedure.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * An entity which is used to init the Bound boxes
 * that have been applied on the images.
 */
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "BoundingBox")
@Table(name = "tb_bounding_box")
public class BoundingBoxEntity extends BaseEntity {
  /**
   * Constructs an entity with only an id in it.
   *
   * @param id The id of the entity.
   */
  public BoundingBoxEntity(Long id) {
    setId(id);
  }

  @Column(name = "probability_of_detection", length = 3)
  private Integer probabilityOfDetection;

  @Column(name = "min_coordinate_x", length = 4, nullable = false)
  private Integer minCoordinateX;

  @Column(name = "max_coordinate_x", length = 4, nullable = false)
  private Integer maxCoordinateX;

  @Column(name = "min_coordinate_y", length = 4, nullable = false)
  private Integer minCoordinateY;

  @Column(name = "max_coordinate_y", length = 4, nullable = false)
  private Integer maxCoordinateY;

  @Column(name = "is_homogenous", nullable = false, length = 1)
  private Boolean homogenous;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "plant_scientific_name")
  private PlantEntity plant;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "image_to_analyse")
  private ImageEntity image;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "procedure_log_id")
  private ProcedureLogEntity procedureLog;
}
