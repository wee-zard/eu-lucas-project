package com.lucas.spring.components.year.service.impl;

import com.lucas.spring.components.year.enums.CreationYearExceptionEnum;
import com.lucas.spring.components.year.exception.CreationYearException;
import com.lucas.spring.components.year.model.entity.CreationYearEntity;
import com.lucas.spring.components.year.repository.CreationYearRepository;
import com.lucas.spring.components.year.service.CreationYearService;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * Implements the method of the {@link CreationYearService} service.
 */
@Service
@AllArgsConstructor
@CacheConfig(cacheNames = "CH_CREATION_YEAR")
public class CreationYearServiceImpl implements CreationYearService {
  private final CreationYearRepository creationYearRepository;

  /**
   * {@inheritDoc}
   */
  @Override
  @Cacheable
  public List<CreationYearEntity> getCreationYears() {
    return creationYearRepository.findAll();
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

    if (selectedYear.isEmpty()) {
      final String year = String.valueOf(yearToFetch);
      throw new CreationYearException(CreationYearExceptionEnum.CREATION_YEAR_NOT_FOUND, year);
    }

    return selectedYear.get();
  }

  /**
   * {@inheritDoc}
   */
  @Override
  @CacheEvict(allEntries = true)
  public void addCreationYear(final int creationYear) {
    final CreationYearEntity entity = CreationYearEntity.builder().year(creationYear).build();
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

    if (entity.isPresent()) {
      return;
    }

    addCreationYear(creationYear);
  }
}
