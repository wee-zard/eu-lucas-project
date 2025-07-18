package com.lucas.spring.components.country.service.impl;

import com.lucas.spring.components.country.enums.CountryExceptionEnum;
import com.lucas.spring.components.country.exception.CountryException;
import com.lucas.spring.components.country.model.entity.CreationCountryEntity;
import com.lucas.spring.components.country.repository.CreationCountryRepository;
import com.lucas.spring.components.country.service.CreationCountryService;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * A service where we store methods
 * related to the Creation Countries.
 */
@AllArgsConstructor
@Service
@CacheConfig(cacheNames = "CH_COUNTRY")
public class CreationCountryServiceImpl implements CreationCountryService {
  private final CreationCountryRepository creationCountryRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable
  public List<CreationCountryEntity> getCreationCountries() {
    return creationCountryRepository.findAll();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public CreationCountryEntity getCreationCountry(final String countryCode) {
    Optional<CreationCountryEntity> selectedCountry = getCreationCountries()
            .stream()
            .filter(country -> country.getCountryCode().equals(countryCode))
            .findFirst();
    if (selectedCountry.isPresent()) {
      return selectedCountry.get();
    } else {
      throw new CountryException(CountryExceptionEnum.COUNTRY_NOT_FOUND, countryCode);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict
  public void addCreationCountry(final String countryCode, final String countryName) {
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
    final Optional<CreationCountryEntity> selectedCreationCountryEntity = getCreationCountries()
          .stream()
          .filter(entity -> entity.getCountryCode().equals(countryCode))
          .findAny();

    if (selectedCreationCountryEntity.isEmpty()) {
      addCreationCountry(countryCode, countryName);
    }
  }
}
