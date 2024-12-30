package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.CreationYearRepository;
import com.lucas.spring.model.entity.CreationYearEntity;
import com.lucas.spring.model.expection.YearNotFoundException;
import com.lucas.spring.services.service.CreationYearService;
import java.util.ArrayList;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link CreationYearService} service.
 */
@Service
@AllArgsConstructor
public class CreationYearServiceImpl implements CreationYearService {
  private static final String SERVICE_CACHE_NAME = "CH_CREATION_YEAR";
  private CreationYearRepository creationYearRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable(SERVICE_CACHE_NAME)
  public ArrayList<CreationYearEntity> getCreationYears() {
    return creationYearRepository.fetchAllCreationYear();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public CreationYearEntity getCreationYear(final int yearToFetch) {
    final Optional<CreationYearEntity> selectedYear = getCreationYears()
        .stream()
        .filter(year -> year.getYear() == yearToFetch)
        .findFirst();

    if (selectedYear.isPresent()) {
      return selectedYear.get();
    } else {
      throw new YearNotFoundException(yearToFetch);
    }
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(SERVICE_CACHE_NAME)
  public void addCreationYear(final int creationYear) {
    final CreationYearEntity entity = CreationYearEntity
        .builder()
        .year(creationYear)
        .build();
    creationYearRepository.save(entity);
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public void isCreationYearIncludedInTheDb(final int creationYear) {
    final Optional<CreationYearEntity> entity = getCreationYears()
        .stream()
        .filter(year -> year.getYear() == creationYear)
        .findAny();
    if (entity.isEmpty()) {
      addCreationYear(creationYear);
    }
  }
}
