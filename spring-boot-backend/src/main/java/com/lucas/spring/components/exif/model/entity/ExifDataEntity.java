package com.lucas.spring.components.exif.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import com.lucas.spring.components.image.model.entity.ImageEntity;
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
import lombok.Setter;
import lombok.ToString;

/**
 * Exif data entity.
 */
@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ExifData")
@Table(name = "tb_exif_data")
public class ExifDataEntity extends BaseEntity {
  public static final int EXIF_DATA_VALUE_MAX_LENGTH = 100;

  @Column(name = "exif_value", nullable = false, length = EXIF_DATA_VALUE_MAX_LENGTH)
  private String exifValue;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "exif_key_id")
  private ExifKeyEntity exifKey;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "image_id")
  private ImageEntity image;
}
