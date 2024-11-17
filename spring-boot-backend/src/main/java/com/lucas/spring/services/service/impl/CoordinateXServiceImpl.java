package com.lucas.spring.services.service.impl;

import com.lucas.spring.database.repositories.CoordinateXRepository;
import com.lucas.spring.model.entity.CoordinateXEntity;
import com.lucas.spring.model.expection.CoordinateXNotFoundException;
import com.lucas.spring.services.service.CoordinateXService;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

/**
 * A service where we store methods
 * related to the image coordinates.
 */
@AllArgsConstructor
@Service
public class CoordinateXServiceImpl implements CoordinateXService {
    private static final String SERVICE_CACHE_NAME = "CH_COORDINATE_X";
    private final CoordinateXRepository coordinateXRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    @Cacheable(SERVICE_CACHE_NAME)
    public ArrayList<CoordinateXEntity> getCoordinateXs() {
        return coordinateXRepository.fetchAllCoordinateXEntities();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CoordinateXEntity getCoordinateX(Integer coordinateX) {
        Optional<CoordinateXEntity> selectedCoordinateX = getCoordinateXs()
                .stream()
                .filter(coordinateXEntity -> Objects.equals(coordinateXEntity.getCoordinateX(), coordinateX))
                .findFirst();
        if (selectedCoordinateX.isPresent()) {
            return selectedCoordinateX.get();
        } else {
            throw new CoordinateXNotFoundException(coordinateX);
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @CacheEvict(SERVICE_CACHE_NAME)
    public void addCoordinateX(Integer coordinateX) {
        CoordinateXEntity coordinateXEntity = CoordinateXEntity
                .builder()
                .coordinateX(coordinateX)
                .build();
        coordinateXRepository.save(coordinateXEntity);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void isCoordinateXIncludedInTheDb(Integer coordinateX) {
        ArrayList<CoordinateXEntity> coordinateXEntities = getCoordinateXs();

        Optional<CoordinateXEntity> selectedCoordinateX = coordinateXEntities
                .stream()
                .filter(coordinateXEntity -> Objects.equals(coordinateXEntity.getCoordinateX(), coordinateX))
                .findAny();

        if (selectedCoordinateX.isEmpty()) {
            addCoordinateX(coordinateX);
        }
    }
}
