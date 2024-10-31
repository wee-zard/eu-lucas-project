package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.database_layer.repository.CreationDirectionRepository;
import com.lucas.spring_boot.model_layer.expection.DirectionNotFoundException;
import com.lucas.spring_boot.model_layer.entity.CreationDirectionEntity;
import com.lucas.spring_boot.service_layer.service.CreationDirectionService;
import lombok.AllArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@AllArgsConstructor
@Service
public class CreationDirectionServiceImpl implements CreationDirectionService {
    private static final String SERVICE_CACHE_NAME = "CH_DIRECTIONS";
    private CreationDirectionRepository creationDirectionRepository;
    /**
     * {@inheritDoc}
     */
    @Override
    @Cacheable(SERVICE_CACHE_NAME)
    public ArrayList<CreationDirectionEntity> getCreationDirections() {
        return creationDirectionRepository.fetchAllCreationDirections();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public CreationDirectionEntity getCreationDirection(String directionToFetch) {
        Optional<CreationDirectionEntity> selectedDirection = getCreationDirections()
                .stream()
                .filter(direction -> direction.getDirectionName().equals(directionToFetch))
                .findFirst();
        if (selectedDirection.isPresent()) {
            return selectedDirection.get();
        } else {
            throw new DirectionNotFoundException();
        }
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @CacheEvict(SERVICE_CACHE_NAME)
    public void addCreationDirection(String creationDirection) {
        CreationDirectionEntity creationDirectionEntity = CreationDirectionEntity
                .builder()
                .directionName(creationDirection)
                .build();
        creationDirectionRepository.save(creationDirectionEntity);
    }

    /**
     * {@inheritDoc}
     */
    public void isCreationDirectionIncludedInTheDB(String creationDirection) {
        ArrayList<CreationDirectionEntity> creationDirectionEntities = getCreationDirections();

        Optional<CreationDirectionEntity> selectedCreationDirectionEntity = creationDirectionEntities.stream()
                .filter(creationDirectionEntity -> creationDirectionEntity.directionName.equals(creationDirection))
                .findAny();

        if (selectedCreationDirectionEntity.isEmpty()) {
            addCreationDirection(creationDirection);
        }
    }
}
