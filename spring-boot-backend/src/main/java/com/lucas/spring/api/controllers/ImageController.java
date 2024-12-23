package com.lucas.spring.api.controllers;

import com.lucas.spring.model.dto.ImageDto;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.model.request.filtering.FilteringQueryRequest;
import com.lucas.spring.model.response.PageableResponse;
import com.lucas.spring.services.facade.ExifFacadeService;
import com.lucas.spring.services.facade.ImageFacadeService;
import com.lucas.spring.services.service.ImageFilterService;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
  public static final String PAGEABLE_PROPERTIES = "X-Pageable-Properties";

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

  /*
  //@TokenValidation
  @CrossOrigin
  @PostMapping("/filter-image")
  public PageableResponse<ImageDto> postFilterImages(
          //@RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication
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
    final PageableProperties pageableProperties = PageableProperties.builder()
            .pageNo(9)
            .pageSize(0)
            .build();
    return new PageableResponse<>(pageableProperties, dto);
  }
  */

  /**
   * An endpoint to apply filters on the image table.
   *
   * @param filteringQueryRequest The request containing the filters.
   */
  @PostMapping("/query-builder-image")
  public PageableResponse<ImageDto> postQueryBuilderImage(
          //@RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication,
          @RequestHeader(PAGEABLE_PROPERTIES) PageableProperties pageableProperties,
          @RequestBody FilteringQueryRequest filteringQueryRequest
  ) {
    // TODO: Add proper PageableProperties object here...
    //Page<ImageEntity> pageable = imageFilterService.filterImages(filteringQueryRequest, null);
    return null;
  }
}
