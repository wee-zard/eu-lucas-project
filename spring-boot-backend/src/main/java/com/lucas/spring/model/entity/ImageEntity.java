package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.*;

@Data
@Builder
@Getter
@Setter
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
     * The longitude circle of the gps.
     */
    @Column(name = "gps_longitude_circle", nullable = false, length = 3)
    private int gpsLongitudeCircle;
    /**
     * The latitude circle of the gps.
     */
    @Column(name = "gps_latitude_circle", nullable = false, length = 3)
    private int gpsLatitudeCircle;
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

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", imageName='" + imageName + '\'' +
                ", gpsLongitudeCircle=" + gpsLongitudeCircle +
                ", gpsLatitudeCircle=" + gpsLatitudeCircle +
                ", direction=" + direction +
                ", country=" + country +
                ", year=" + year +
                '}';
    }
}
