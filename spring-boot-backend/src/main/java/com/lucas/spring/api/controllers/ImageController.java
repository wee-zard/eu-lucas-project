package com.lucas.spring.api.controllers;

import com.lucas.spring.helper.annotations.token.TokenValidation;
import com.lucas.spring.model.dto.ImageDto;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.model.request.filtering.ImageFilteringRequest;
import com.lucas.spring.model.response.PageableResponse;
import com.lucas.spring.services.facade.ExifFacadeService;
import com.lucas.spring.services.facade.ImageFacadeService;
import com.lucas.spring.services.service.ImageFilterService;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
  // TODO: private final ConversionService conversionService;

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

  /**
   * An endpoint to apply filters on the image table.
   *
   * @param imageFilteringRequest The request containing the filters.
   */
  //@TokenValidation
  @CrossOrigin
  @PostMapping("/filter-image")
  public PageableResponse<ImageDto> postFilterImages(
          //@RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication,
          @RequestBody ImageFilteringRequest imageFilteringRequest
  ) {
    Page<ImageEntity> pageable = imageFilterService.filterImage(imageFilteringRequest);

    List<ImageDto> dto = pageable
            .stream()
            .map(imageEntity -> ImageDto.builder()
                            .id(imageEntity.getId())
                            .year(imageEntity.getYear().getYear())
                            .imageName(imageEntity.getImageName())
                            .country(imageEntity.getCountry().getCountryCode())
                            .direction(imageEntity.getDirection().getDirectionName())
                            .coordinateX(imageEntity.getCoordinateX().getCoordinateX())
                            .coordinateY(imageEntity.getCoordinateY().getCoordinateY())
                            .build())
            .toList();
    return new PageableResponse<>(0, 9, dto);
  }
}
