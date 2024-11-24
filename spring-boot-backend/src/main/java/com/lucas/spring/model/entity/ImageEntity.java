package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "Image")
@Table(name = "tb_image")
public class ImageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    /**
     * The name of the image.
     */
    @Column(name = "image_name", nullable = false, columnDefinition = "TEXT", length = 50)
    private String imageName;
    /**
     * The direction where the image was taken.
     */
    @ManyToOne
    @JoinColumn(name = "direction_name")
    private CreationDirectionEntity direction;
    /**
     * The country where the image was taken.
     */
    @ManyToOne
    @JoinColumn(name = "country_code")
    private CreationCountryEntity country;
    /**
     * The year when the image was taken.
     */
    @ManyToOne
    @JoinColumn(name = "year")
    private CreationYearEntity year;
    /**
     * The X coordinate of the image from where it was taken.
     */
    @ManyToOne
    @JoinColumn(name = "coordinate_x")
    private CoordinateXEntity coordinateX;
    /**
     * The Y coordinate of the image from where it was taken.
     */
    @ManyToOne
    @JoinColumn(name = "coordinate_y")
    private CoordinateYEntity coordinateY;

    @ManyToMany(mappedBy = "listOfImages")
    private Set<PlantEntity> listOfPlants;
}
