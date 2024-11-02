package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.database_layer.repository.CreationYearRepository;
import com.lucas.spring_boot.model_layer.expection.YearNotFoundException;
import com.lucas.spring_boot.model_layer.entity.CreationYearEntity;
import com.lucas.spring_boot.service_layer.service.CreationYearService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

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
    public CreationYearEntity getCreationYear(int yearToFetch) {
        Optional<CreationYearEntity> selectedYear = getCreationYears()
                .stream()
                .filter(year -> year.getYear() == yearToFetch)
                .findFirst();

        if (selectedYear.isPresent()) {
            return selectedYear.get();
        } else {
            throw new YearNotFoundException();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @CacheEvict(SERVICE_CACHE_NAME)
    public void addCreationYear(int creationYear) {
        CreationYearEntity creationYearEntity = CreationYearEntity.builder()
                .year(creationYear)
                .build();
        creationYearRepository.save(creationYearEntity);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void isCreationYearIncludedInTheDB(int creationYear) {
        ArrayList<CreationYearEntity> creationYears = getCreationYears();

        Optional<CreationYearEntity> selectedCreationYearEntity = creationYears
                .stream()
                .filter(year -> year.getYear() == creationYear)
                .findAny();

        if (selectedCreationYearEntity.isEmpty()) {
            addCreationYear(creationYear);
        }
    }
}
