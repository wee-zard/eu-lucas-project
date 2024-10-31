package com.lucas.spring_boot.service_layer.facade;

import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.model_layer.request.ImageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface ImageFacadeService {
    /**
     * Adds the requested image to the db.
     * @param imageRequest - The image we want to add to the db.
     * @return The newly added image to the db.
     */
    Optional<ImageEntity> addImage(ImageRequest imageRequest);
}
