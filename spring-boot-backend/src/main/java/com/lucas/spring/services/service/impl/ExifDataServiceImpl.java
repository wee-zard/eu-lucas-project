package com.lucas.spring.services.service.impl;

import com.lucas.spring.database_layer.repository.ExifDataRepository;
import com.lucas.spring.model.entity.ExifDataEntity;
import com.lucas.spring.services.service.ExifDataService;
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
