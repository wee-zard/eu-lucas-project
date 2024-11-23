package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Entity(name = "ExifKey")
@Table(name = "tb_exif_key")
public class ExifKeyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exif_code")
    private Long exifCode;

    @Column(name = "exif_key_name", length = 100, nullable = false)
    private String exifKeyName;

    @Override
    public String toString() {
        return "ExifKeyEntity{" +
                "exifCode=" + exifCode +
                ", exifKeyName='" + exifKeyName + '\'' +
                '}';
    }
}
