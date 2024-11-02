package com.lucas.spring_boot.service_layer.facade;

import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.model_layer.request.ImageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public interface ImageFacadeService {
    /**
     * Construct an Image Entity based on the requested image data.
     * @param imageRequest - The image we want to add to the db.
     * @return The Image Entity to add later to the db.
     */
    Optional<ImageEntity> getImageEntity(ImageRequest imageRequest);
}
