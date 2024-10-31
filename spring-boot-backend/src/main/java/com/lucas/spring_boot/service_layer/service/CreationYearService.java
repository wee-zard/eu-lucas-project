package com.lucas.spring_boot.service_layer.service;

import com.lucas.spring_boot.model_layer.entity.CreationYearEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface CreationYearService {
    /**
     * Fetch the list of creation years when the images were taken from.
     * @return list of years.
     */
    ArrayList<CreationYearEntity> getCreationYears();

    /**
     * Fetch a single year when the image was taken from.
     * @param yearToFetch The year to fetch from the db.
     * @return a direction.
     */
    CreationYearEntity getCreationYear(int yearToFetch);

    /**
     * asd.
     * @param creationYear The year the image is created.
     */
    void addCreationYear(int creationYear);

    /**
     * Checks if the provided year is already exists in the db. If not, then we
     * add this new year in to the db.
     * @param creationYear The year the image is created.
     */
    void isCreationYearIncludedInTheDB(int creationYear);
}
