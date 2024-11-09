package com.lucas.spring.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

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
    @Column(name = "country_code", length=2, nullable = false, columnDefinition = "TEXT")
    public String countryCode;

    @Column(name = "country_name", length=100, nullable = false, columnDefinition = "TEXT")
    public String countryName;

    @Override
    public String toString() {
        return "CreationCountryEntity{" +
                "countryCode='" + countryCode + '\'' +
                ", countryName='" + countryName + '\'' +
                '}';
    }
}
