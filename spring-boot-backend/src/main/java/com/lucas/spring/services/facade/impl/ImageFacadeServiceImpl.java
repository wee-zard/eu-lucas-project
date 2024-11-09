package com.lucas.spring.services.facade.impl;

import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.services.facade.ImageFacadeService;
import com.lucas.spring.services.service.CreationCountryService;
import com.lucas.spring.services.service.CreationDirectionService;
import com.lucas.spring.services.service.CreationYearService;
import com.lucas.spring.services.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ImageFacadeServiceImpl implements ImageFacadeService {
    private CreationYearService creationYearService;
    private CreationDirectionService creationDirectionService;
    private CreationCountryService creationCountryService;
    private ImageService imageService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<ImageEntity> getImageEntity(ImageRequest imageRequest) {
        if(!imageService.isImageNameAlreadyExists(imageRequest.imageName)) {
            creationYearService.isCreationYearIncludedInTheDb(imageRequest.getYear());
            creationDirectionService.isCreationDirectionIncludedInTheDd(imageRequest.getDirectionName());
            creationCountryService.isCreationDirectionIncludedInTheDb(imageRequest.getCountryCode(), imageRequest.getCountryName());
            return Optional.ofNullable(imageService.saveImage(
                ImageEntity
                    .builder()
                    .imageName(imageRequest.getImageName())
                    .gpsLongitudeCircle(imageRequest.getLongitude())
                    .gpsLatitudeCircle(imageRequest.getLatitude())
                    .direction(creationDirectionService.getCreationDirection(imageRequest.getDirectionName()))
                    .country(creationCountryService.getCreationCountry(imageRequest.getCountryCode()))
                    .year(creationYearService.getCreationYear(imageRequest.getYear()))
                    .build()));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<ImageEntity> getRandomImage() {
        return imageService.getRandomImage();
    }

    @Override
    public ArrayList<ImageEntity> getRandomImages() {
        return imageService.getRandomImages();
    }
}
