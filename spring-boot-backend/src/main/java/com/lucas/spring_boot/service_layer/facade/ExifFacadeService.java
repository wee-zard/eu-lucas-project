package com.lucas.spring_boot.service_layer.facade;

import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.model_layer.models.ExifDataModel;
import com.lucas.spring_boot.model_layer.request.ImageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public interface ExifFacadeService {
    /**
     * Upload image exif header information to the db.
     * @param exifDataModels the exif header information of an image.
     * @param imageEntity the uploaded image.
     */
    void saveImageExifHeader(ArrayList<ExifDataModel> exifDataModels, ImageEntity imageEntity);
}
