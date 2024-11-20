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
@Entity(name = "ExifData")
@Table(name = "tb_exif_data")
public class ExifDataEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "exif_id")
  private Long exifId;

  @Column(name = "exif_value", nullable = false, length = 100)
  private String exifValue;

  @ManyToOne
  @JoinColumn(name = "exif_key_id")
  private ExifKeyEntity exifKeyEntity;

  @ManyToOne
  @JoinColumn(name = "image_id")
  private ImageEntity imageEntity;

  @Override
  public String toString() {
    return "ExifDataEntity{"
        + "exifId=" + exifId
        + ", exifValue='" + exifValue + '\''
        + ", exifKeyId=" + exifKeyEntity
        + ", imageId=" + imageEntity
        + '}';
  }
}
