package com.lucas.spring.components.exif.model.entity;

import com.lucas.spring.commons.model.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * Exif key entity.
 */
@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "ExifKey")
@Table(name = "tb_exif_key")
public class ExifKeyEntity extends BaseEntity {
  @Column(name = "exif_key_name", length = 100, nullable = false)
  private String exifKeyName;
}
