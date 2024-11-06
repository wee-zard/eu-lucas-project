package com.lucas.spring_boot.service_layer.facade.impl;

import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.model_layer.request.ImageRequest;
import com.lucas.spring_boot.service_layer.facade.ImageFacadeService;
import com.lucas.spring_boot.service_layer.service.CreationCountryService;
import com.lucas.spring_boot.service_layer.service.CreationDirectionService;
import com.lucas.spring_boot.service_layer.service.CreationYearService;
import com.lucas.spring_boot.service_layer.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Optional;
import java.util.stream.Collectors;

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
            creationYearService.isCreationYearIncludedInTheDB(imageRequest.getYear());
            creationDirectionService.isCreationDirectionIncludedInTheDB(imageRequest.getDirectionName());
            creationCountryService.isCreationDirectionIncludedInTheDB(imageRequest.getCountryCode(), imageRequest.getCountryName());
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
