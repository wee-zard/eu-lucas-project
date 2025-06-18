package com.lucas.spring.controllers;

import com.lucas.spring.helper.helper.ConversionHelper;
import com.lucas.spring.model.dto.ImageDto;
import com.lucas.spring.model.entity.ImageEntity;
import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.models.PageableProperties;
import com.lucas.spring.model.request.ImageRequest;
import com.lucas.spring.model.request.filtering.FilteringQueryRequest;
import com.lucas.spring.model.request.procedures.ProcedureResultFileRequest;
import com.lucas.spring.model.response.PageableResponse;
import com.lucas.spring.services.facade.ExifFacadeService;
import com.lucas.spring.services.facade.ImageFacadeService;
import com.lucas.spring.services.service.ImageFilterService;
import com.lucas.spring.services.service.ImageService;
import java.util.List;
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
@AllArgsConstructor
@RequestMapping(path = "api/image")
public class ImageController {
  private final ImageFacadeService imageFacadeService;
  private final ExifFacadeService exifFacadeService;
  private final ImageFilterService imageFilterService;
  private final ConversionHelper conversionHelper;
  private final ImageService imageService;

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
   * Filter images by the provided query builder, while giving back only the
   * necessary length of records from the db based on the values of the {@link PageableProperties}.
   *
   * @param authenticatedUser The user who initialized the connection to the server.
   * @param filteringQueryRequest The request containing the filters.
   * @return Returns a {@link PageableResponse} that contains the list of images that are
   *     satisfying the query builder, and only giving back a limited number of them based on
   *     the value of the {@link PageableProperties}, while converting the result
   *     {@link ImageEntity} into {@link ImageDto}.
   */
  @CrossOrigin
  @PostMapping("/filter-images")
  public PageableResponse<ImageDto> postQueryBuilderImage(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
          @RequestHeader(ConversionHelper.PAGEABLE_PROPERTIES) PageableProperties properties,
          @RequestBody FilteringQueryRequest filteringQueryRequest
  ) {
    return conversionHelper.pageToPageableResponse(
            imageFilterService.filterImages(filteringQueryRequest, properties),
            ImageDto.class,
            properties);
  }

  /**
   * Retrieves an images based on the provided image names and creation years.
   *
   * @param authenticatedUser The user who initialized the connection to the server.
   * @param filesRequest The list of image files, where the name of the image and the
   *                    creation year is provided for the purpose of fetching the
   *                    image urls from the db.
   * @return Returns the images.
   */
  @CrossOrigin
  @PostMapping("/")
  public List<ImageDto> postImageByImageNameAndCreationYear(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser,
          @RequestBody ProcedureResultFileRequest filesRequest
  ) {
    return conversionHelper.convertList(
            imageService.getImagesByProcedureFiles(filesRequest.getFiles()),
            ImageDto.class);
  }
}
