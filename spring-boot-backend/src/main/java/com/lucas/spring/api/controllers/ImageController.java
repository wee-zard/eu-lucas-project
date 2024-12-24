package com.lucas.spring.api.controllers;

import com.lucas.spring.api.controllers.abstraction.BaseController;
import com.lucas.spring.helper.annotations.token.TokenValidation;
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
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
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
public class ImageController extends BaseController {
  private final ImageFacadeService imageFacadeService;
  private final ExifFacadeService exifFacadeService;
  private final ImageFilterService imageFilterService;
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

  /**
   * An endpoint to apply filters on the image table.
   *
   * @param filteringQueryRequest The request containing the filters.
   */
  @TokenValidation
  @CrossOrigin
  @PostMapping("/query-builder-image")
  public PageableResponse<ImageDto> postQueryBuilderImage(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final String authentication,
          @RequestHeader(PAGEABLE_PROPERTIES) PageableProperties pageableProperties,
          @RequestBody FilteringQueryRequest filteringQueryRequest
  ) {
    return pageToPageableResponse(
            imageFilterService.filterImages(filteringQueryRequest, pageableProperties),
            ImageDto.class,
            pageableProperties);
  }
}
