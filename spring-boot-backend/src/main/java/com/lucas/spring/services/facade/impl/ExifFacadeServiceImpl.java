package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.ExifDataEntity;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.models.ExifDataModel;
import com.lucas.spring.services.facade.ExifFacadeService;
import com.lucas.spring.services.service.ExifDataService;
import com.lucas.spring.services.service.ExifKeyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ExifFacadeServiceImpl implements ExifFacadeService {
    private ExifKeyService exifKeyService;
    private ExifDataService exifDataService;

    /**
     * {@inheritDoc}
     */
    @Override
    public void saveImageExifHeader(ArrayList<ExifDataModel> exifDataModels, ImageEntity imageEntity) {
        new ArrayList<>(new HashSet<>(
        exifDataModels
                .stream()
                .map(ExifDataModel::getExifKey)
                .collect(Collectors.toSet()))
        ).forEach(exifKey -> exifKeyService.isExifKeyIncludedInTheDB(exifKey));

        exifDataModels
                .stream()
                .map(exifDataModel -> ExifDataEntity
                        .builder()
                        .imageEntity(imageEntity)
                        .exifValue(exifDataModel.getExifValue())
                        .exifKeyEntity(exifKeyService.getExifKey(exifDataModel.exifKey))
                        .build())
                        .collect(Collectors.toCollection(ArrayList::new))
                .forEach(exifDataEntity -> exifDataService.addExifDataModel(exifDataEntity));
    }
}
