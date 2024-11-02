package com.lucas.spring_boot.service_layer.facade.impl;

import com.lucas.spring_boot.model_layer.entity.ExifDataEntity;
import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.model_layer.models.ExifDataModel;
import com.lucas.spring_boot.model_layer.request.ImageRequest;
import com.lucas.spring_boot.service_layer.facade.ExifFacadeService;
import com.lucas.spring_boot.service_layer.service.ExifDataService;
import com.lucas.spring_boot.service_layer.service.ExifKeyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
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
