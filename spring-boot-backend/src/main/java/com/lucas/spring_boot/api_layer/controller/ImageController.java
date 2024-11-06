package com.lucas.spring_boot.api_layer.controller;

import com.lucas.spring_boot.model_layer.entity.ImageEntity;
import com.lucas.spring_boot.model_layer.request.ImageRequest;
import com.lucas.spring_boot.service_layer.facade.ExifFacadeService;
import com.lucas.spring_boot.service_layer.facade.ImageFacadeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/image")
@AllArgsConstructor
public class ImageController {
    private ImageFacadeService imageFacadeService;
    private ExifFacadeService exifFacadeService;
    @PostMapping("/save-image")
    public @ResponseBody void postNewImage(@RequestBody ImageRequest imageRequest) {
        Optional<ImageEntity> imageToUpload = imageFacadeService.getImageEntity(imageRequest);
        imageToUpload.ifPresent(imageEntity -> exifFacadeService.saveImageExifHeader(imageRequest.getExifData(), imageEntity));
    }

    @CrossOrigin
    @GetMapping("/random-image")
    public Optional<ImageEntity> getRandomImage() {
        return imageFacadeService.getRandomImage();
    }

    @CrossOrigin
    @GetMapping("/random-images")
    public ArrayList<ImageEntity> getRandomImages() {
        return imageFacadeService.getRandomImages();
    }
}
