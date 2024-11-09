package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.CreationCountryRepository;
import com.lucas.spring.model.entity.CreationCountryEntity;
import com.lucas.spring.model.expection.CountryNotFoundException;
import com.lucas.spring.services.service.CreationCountryService;
import java.util.ArrayList;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * A service where we store methods
 * related to the Creation Countries.
 */
@AllArgsConstructor
@Service
public class CreationCountryServiceImpl implements CreationCountryService {
  private static final String SERVICE_CACHE_NAME = "CH_COUNTRY";
  private final CreationCountryRepository creationCountryRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable(SERVICE_CACHE_NAME)
  public ArrayList<CreationCountryEntity> getCreationCountries() {
    return creationCountryRepository.fetchAllCreationCountries();
  }

  /**
   * {@inheritDoc}
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
      throw new CountryNotFoundException(countryCode);
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
  public void isCreationDirectionIncludedInTheDb(String countryCode, String countryName) {
    ArrayList<CreationCountryEntity> creationDirectionEntities = getCreationCountries();

    Optional<CreationCountryEntity> selectedCreationCountryEntity = creationDirectionEntities
          .stream()
          .filter(creationCountryEntity -> creationCountryEntity.getCountryName().equals(countryCode))
          .findAny();

    if (selectedCreationCountryEntity.isEmpty()) {
      addCreationCountry(countryCode, countryName);
    }
  }
}
