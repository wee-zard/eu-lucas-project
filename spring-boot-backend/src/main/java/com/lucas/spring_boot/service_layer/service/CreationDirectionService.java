package com.lucas.spring_boot.service_layer.service;

import com.lucas.spring_boot.model_layer.entity.CreationDirectionEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface CreationDirectionService {
    /**
     * Fetch the list of directions where the images were taken from.
     * @return List of directions.
     */
    ArrayList<CreationDirectionEntity> getCreationDirections();

    /**
     * Fetch a single direction where the image was taken from.
     * @param directionToFetch The direction to fetch from the db.
     * @return a direction.
     */
    CreationDirectionEntity getCreationDirection(String directionToFetch);

    /**
     * Saves the direction where the image was taken.
     * @param creationDirection The direction where the image is taken.
     */
    void addCreationDirection(String creationDirection);

    /**
     * Checks if the provided direction is already exists in the db. If not, then we
     * add this new direction to the db.
     * @param creationDirection The direction where the image is taken.
     */
    void isCreationDirectionIncludedInTheDB(String creationDirection);
}