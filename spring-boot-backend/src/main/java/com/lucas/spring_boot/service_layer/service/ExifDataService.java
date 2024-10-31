package com.lucas.spring_boot.service_layer.service;

import com.lucas.spring_boot.model_layer.entity.ExifDataEntity;
import org.springframework.stereotype.Service;

@Service
public interface ExifDataService {
    /**
     * Saves the exif data.
     * @param exifDataEntity holds the exif values.
     */
    void addExifDataModel(ExifDataEntity exifDataEntity);
}
