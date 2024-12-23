package com.lucas.spring.services.facade;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.request.ImageRequest;
import java.util.Optional;
import org.springframework.stereotype.Service;

/**
 * Defines methods on the images that uses other
 * components' services as well.
 */
@Service
public interface ImageFacadeService {
  /**
   * Construct an Image Entity based on the requested image data.
   *
   * @param imageRequest - The image we want to add to the db.
   * @return The Image Entity to add later to the db.
   */
  Optional<ImageEntity> getImageEntity(ImageRequest imageRequest);
}
