package com.lucas.spring_boot.service_layer.service;

import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import org.springframework.stereotype.Service;

@Service
public interface ImageService {
    /**
     * Fetch the name of the image name, if the requested image name is exists already in the db.
     * @param imageName The name of the image which we want to check if it is exists in the db or not.
     * @return the image name if exists else null.
     */
    boolean isImageNameAlreadyExists(String imageName);

    /**
     * Save the image to the db.
     * @param imageEntity the image we want to save.
     */
    ImageEntity saveImage(ImageEntity imageEntity);
}
