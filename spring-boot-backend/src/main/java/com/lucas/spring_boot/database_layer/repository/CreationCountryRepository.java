package com.lucas.spring_boot.database_layer.repository;

import com.lucas.spring_boot.model_layer.entity.CreationCountryEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CreationCountryRepository extends CrudRepository<CreationCountryEntity, String> {
    @Query("SELECT new com.lucas.spring_boot.model_layer.entity.CreationCountryEntity(country.countryCode, country.countryName) " +
            "FROM CreationCountry country")
    ArrayList<CreationCountryEntity> fetchAllCreationCountries();
}
