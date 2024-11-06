package com.lucas.spring_boot.service_layer.service.impl;

import com.lucas.spring_boot.database_layer.repository.ImageRepository;
import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.service_layer.service.ImageService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ImageServiceImpl implements ImageService {
    private ImageRepository imageRepository;
    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isImageNameAlreadyExists(String imageName) {
        return imageRepository.isImageNameAlreadyExists(imageName).isPresent();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public ImageEntity saveImage(ImageEntity imageEntity) {
        return imageRepository.save(imageEntity);
    }

    @Override
    public Optional<ImageEntity> getRandomImage() {
        return imageRepository.getRandomImage();
    }

    @Override
    public ArrayList<ImageEntity> getRandomImages() {
        return imageRepository.getRandomImages();
    }
}
