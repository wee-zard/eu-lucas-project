package com.lucas.spring.components.image.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import com.lucas.spring.components.coordinate.x.model.entity.CoordinateXthEntity;
import com.lucas.spring.components.coordinate.y.model.entity.CoordinateYthEntity;
import com.lucas.spring.components.country.model.entity.CreationCountryEntity;
import com.lucas.spring.components.direction.model.entity.CreationDirectionEntity;
import com.lucas.spring.components.folder.model.entity.FolderContentEntity;
import com.lucas.spring.components.plant.model.entity.PlantEntity;
import com.lucas.spring.components.procedure.model.entity.BoundingBoxEntity;
import com.lucas.spring.components.procedure.model.entity.ProcedureLogEntity;
import com.lucas.spring.components.year.model.entity.CreationYearEntity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Defines the structure of the Image entity
 * and the image table represent in the db.
 */
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Image")
@Table(name = "tb_image")
public class ImageEntity extends BaseEntity {
  /**
   * Constructs an entity with only an id in it.
   *
   * @param id The id of the entity.
   */
  public ImageEntity(Long id) {
    setId(id);
  }

  /**
   * The name of the image.
   */
  @Column(name = "image_name", nullable = false, columnDefinition = "TEXT", length = 50)
  private String imageName;
  /**
   * The direction where the image was taken.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "direction_name")
  private CreationDirectionEntity direction;
  /**
   * The country where the image was taken.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "country_code")
  private CreationCountryEntity country;
  /**
   * The year when the image was taken.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "year")
  private CreationYearEntity year;
  /**
   * The X coordinate of the image from where it was taken.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "coordinate_x")
  private CoordinateXthEntity coordinateX;
  /**
   * The Y coordinate of the image from where it was taken.
   */
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "coordinate_y")
  private CoordinateYthEntity coordinateY;
  /**
   * List of plants that have been found in the image
   * by a specific image analyzer.
   */
  @ManyToMany(fetch = FetchType.LAZY, mappedBy = "listOfImages", cascade = CascadeType.ALL)
  private Set<PlantEntity> listOfPlants;
  /**
   * List of procedure logs.
   */
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "image")
  private Set<ProcedureLogEntity> listOfProcedureLogs;
  /**
   * List of bounding boxes of the image.
   */
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "image")
  private Set<BoundingBoxEntity> listOfBoundingBoxes;

  /**
   * Tells in which folders are present the given image.
   * An image can be present in several folders.
   */
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "image")
  private Set<FolderContentEntity> imageContents;
}
