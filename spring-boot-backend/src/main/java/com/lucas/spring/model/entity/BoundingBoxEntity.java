package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
public class BoundingBoxEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

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

  @ManyToOne
  @JoinColumn(name = "plant_scientific_name")
  private PlantEntity plant;

  @ManyToOne
  @JoinColumn(name = "image_to_analyse")
  private ImageEntity image;

  @ManyToOne
  @JoinColumn(name = "procedure_log_id")
  private ProcedureLogEntity procedureLog;
}
