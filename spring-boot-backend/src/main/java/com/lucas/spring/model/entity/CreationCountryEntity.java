package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Storing the most important information
 * related to the Creation Countries.
 */
@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CreationCountry")
@Table(name = "tb_creation_country")
public class CreationCountryEntity {
  @Id
  @Column(name = "country_code", length = 2, nullable = false, columnDefinition = "TEXT")
  private String countryCode;

  @Column(name = "country_name", length = 100, nullable = false, columnDefinition = "TEXT")
  private String countryName;

  @Override
  public final String toString() {
    return "CreationCountryEntity{"
            + "countryCode='" + countryCode + '\''
            + ", countryName='" + countryName + '\''
            + '}';
  }
}
