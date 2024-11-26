package com.lucas.spring.api.controllers;

import com.lucas.spring.helper.annotations.token.TokenValidation;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.model.request.filtering.ImageFilteringRequest;
import com.lucas.spring.services.facade.ExifFacadeService;
import com.lucas.spring.services.facade.ImageFacadeService;
import java.util.ArrayList;
import java.util.Optional;

import com.lucas.spring.services.service.ImageFilterService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the image.
 */
@RestController
@RequestMapping(path = "api/image")
@AllArgsConstructor
public class ImageController {
  private final ImageFacadeService imageFacadeService;
  private final ExifFacadeService exifFacadeService;
  private final ImageFilterService imageFilterService;

  /**
   * An endpoint to upload image information to the db.
   *
   * @param imageRequest The image object we want to push to the db.
   */
  @PostMapping("/save-image")
  public void postNewImage(@RequestBody final ImageRequest imageRequest) {
    Optional<ImageEntity> imageToUpload = imageFacadeService.getImageEntity(imageRequest);
    imageToUpload.ifPresent(
            imageEntity -> exifFacadeService.saveImageExifHeader(
                    imageRequest.getExifData(),
                    imageEntity)
    );
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

  //@TokenValidation
  @CrossOrigin
  @PostMapping("/filter-image")
  public void postFilterImages(
          //@RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication,
          @RequestBody ImageFilteringRequest imageFilteringRequest
  ) {
    imageFilterService.filterImage(imageFilteringRequest);
  }
}
