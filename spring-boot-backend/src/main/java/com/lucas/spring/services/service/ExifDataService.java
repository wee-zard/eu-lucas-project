package com.lucas.spring.services.service;

import com.lucas.spring.model.entity.ExifDataEntity;
import org.springframework.stereotype.Service;

@Service
public interface ExifDataService {
    /**
     * Saves the exif data.
     * @param exifDataEntity holds the exif values.
     */
    void addExifDataModel(ExifDataEntity exifDataEntity);
}
