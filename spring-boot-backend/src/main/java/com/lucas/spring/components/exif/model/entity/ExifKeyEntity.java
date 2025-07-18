package com.lucas.spring.components.exif.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
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
@Entity(name = "ExifKey")
@Table(name = "tb_exif_key")
public class ExifKeyEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private final Long id;
  @Column(name = "exif_key_name", length = 100, nullable = false)
  private String exifKeyName;
}
