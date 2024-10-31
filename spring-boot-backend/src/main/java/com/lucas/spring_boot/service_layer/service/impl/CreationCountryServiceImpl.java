package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.database_layer.repository.CreationCountryRepository;
import com.lucas.spring_boot.model_layer.expection.CountryNotFoundException;
import com.lucas.spring_boot.model_layer.entity.CreationCountryEntity;
import com.lucas.spring_boot.service_layer.service.CreationCountryService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CreationCountryServiceImpl implements CreationCountryService {
    private static final String SERVICE_CACHE_NAME = "CH_COUNTRY";
    private CreationCountryRepository creationCountryRepository;
    /**
     * {@inheritDoc}
     */
    @Override
    @Cacheable(SERVICE_CACHE_NAME)
    public ArrayList<CreationCountryEntity> getCreationCountries() {
        return creationCountryRepository.fetchAllCreationCountries();
    }

    /**
     * Fetch a single country where the image was taken from.
     *
     * @param countryCode The country code to fetch by from the db.
     * @return a country.
     */
    @Override
    public CreationCountryEntity getCreationCountry(String countryCode) {
        Optional<CreationCountryEntity> selectedCountry = getCreationCountries()
                .stream()
                .filter(country -> country.getCountryCode().equals(countryCode))
                .findFirst();
        if (selectedCountry.isPresent()) {
            return selectedCountry.get();
        } else {
            throw new CountryNotFoundException();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @CacheEvict(SERVICE_CACHE_NAME)
    public void addCreationCountry(String countryCode, String countryName) {
        CreationCountryEntity creationCountryEntity = CreationCountryEntity
                .builder()
                .countryCode(countryCode)
                .countryName(countryName)
                .build();
        creationCountryRepository.save(creationCountryEntity);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void isCreationDirectionIncludedInTheDB(String countryCode, String countryName) {
        ArrayList<CreationCountryEntity> creationDirectionEntities = getCreationCountries();

        Optional<CreationCountryEntity> selectedCreationCountryEntity = creationDirectionEntities
                .stream()
                .filter(creationCountryEntity -> creationCountryEntity.countryCode.equals(countryCode))
                .findAny();

        if (selectedCreationCountryEntity.isEmpty()) {
            addCreationCountry(countryCode, countryName);
        }
    }
}
