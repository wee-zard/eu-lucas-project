package com.lucas.spring_boot.model_layer.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ExifData")
@Table(name = "exif_data")
public class ExifDataEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exif_id")
    public Long exifId;

    @Column(name = "exif_value", nullable = false, length = 100)
    public String exifValue;

    @ManyToOne
    @JoinColumn(name = "exif_key_id")
    public ExifKeyEntity exifKeyEntity;

    @ManyToOne
    @JoinColumn(name = "image_id")
    public ImageEntity imageEntity;

    @Override
    public String toString() {
        return "ExifDataEntity{" +
                "exifId=" + exifId +
                ", exifValue='" + exifValue + '\'' +
                ", exifKeyId=" + exifKeyEntity +
                ", imageId=" + imageEntity +
                '}';
    }
}
