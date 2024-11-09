package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.ExifKeyEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface ExifKeyService {
    /**
     * Fetch the list of exif keys.
     * @return List of exif keys.
     */
    ArrayList<ExifKeyEntity> getExifKeys();

    /**
     * Fetch a single exif keys.
     * @return an exif keys.
     */
    ExifKeyEntity getExifKey(String exifKey);

    /**
     * Saves the exif key.
     * @param exifKeyName the name of the new exif key to add to the db.
     */
    void addExifKey(String exifKeyName);

    /**
     * Checks if the provided exif key is already exists in the db.
     * If not, then we add this new exif to the db.
     * @param exifKey The exif key of the image.
     */
    void isExifKeyIncludedInTheDB(String exifKey);
}
