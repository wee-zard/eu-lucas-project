package com.lucas.spring_boot.service_layer.facade.impl;

import com.lucas.spring_boot.model_layer.entity.ExifDataEntity;
import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.model_layer.models.ExifDataModel;
import com.lucas.spring_boot.service_layer.facade.ExifFacadeService;
import com.lucas.spring_boot.service_layer.service.ExifDataService;
import com.lucas.spring_boot.service_layer.service.ExifKeyService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

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
        exifDataModels.forEach(exifDataModel -> exifKeyService.isExifKeyIncludedInTheDB(exifDataModel.exifKey));
        exifDataModels.forEach(exifDataModel -> {
            ExifDataEntity exifDataEntity = ExifDataEntity
                    .builder()
                    .imageEntity(imageEntity)
                    .exifValue(exifDataModel.getExifValue())
                    .exifKeyEntity(exifKeyService.getExifKey(exifDataModel.exifKey))
                    .build();

            exifDataService.addExifDataModel(exifDataEntity);
        });
    }
}
