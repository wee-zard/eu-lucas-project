package com.lucas.spring_boot.model_layer.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ExifKey")
@Table(name = "exif_key")
public class ExifKeyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exif_code")
    public Long exifCode;

    @Column(name = "exif_key_name", length = 100, nullable = false)
    public String exifKeyName;

    @Override
    public String toString() {
        return "ExifKeyEntity{" +
                "exifCode=" + exifCode +
                ", exifKeyName='" + exifKeyName + '\'' +
                '}';
    }
}
