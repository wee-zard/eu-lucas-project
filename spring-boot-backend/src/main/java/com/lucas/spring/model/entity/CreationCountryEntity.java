package com.lucas.spring.model.entity;

import com.lucas.spring.model.entity.abstraction.BaseComparatorEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Storing the most important information
 * related to the Creation Countries.
 */
@Data
@Builder
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "CreationCountry")
@Table(name = "tb_creation_country")
public class CreationCountryEntity extends BaseComparatorEntity<CreationCountryEntity> {
  @Id
  @Column(name = "country_code", length = 2, nullable = false, columnDefinition = "TEXT")
  private String countryCode;

  @Column(name = "country_name", length = 100, nullable = false, columnDefinition = "TEXT")
  private String countryName;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    CreationCountryEntity that = (CreationCountryEntity) o;
    return Objects.equals(countryCode, that.countryCode)
            && Objects.equals(countryName, that.countryName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(countryCode, countryName);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public int compareTo(CreationCountryEntity object) {
    return String.CASE_INSENSITIVE_ORDER.compare(getCountryCode(), object.getCountryCode());
  }
}
