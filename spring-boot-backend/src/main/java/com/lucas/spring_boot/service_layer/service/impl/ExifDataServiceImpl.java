package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.database_layer.repository.ExifDataRepository;
import com.lucas.spring_boot.model_layer.entity.ExifDataEntity;
import com.lucas.spring_boot.service_layer.service.ExifDataService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class ExifDataServiceImpl implements ExifDataService {

    private ExifDataRepository exifDataRepository;
    /**
     * {@inheritDoc}
     */
    @Override
    public void addExifDataModel(ExifDataEntity exifDataEntity) {
        exifDataRepository.save(exifDataEntity);
    }
}
