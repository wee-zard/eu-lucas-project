package com.lucas.spring.components.image;

import com.lucas.spring.commons.constants.ApplicationConstants;
import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.components.exif.facade.ExifFacadeService;
import com.lucas.spring.components.image.facade.ImageFacadeService;
import com.lucas.spring.components.image.model.dto.ImageDto;
import com.lucas.spring.components.image.model.entity.ImageEntity;
import com.lucas.spring.components.image.model.request.FilteringQueryRequest;
import com.lucas.spring.components.image.model.request.ImageRequest;
import com.lucas.spring.components.image.service.ImageFilterService;
import com.lucas.spring.components.image.service.ImageService;
import com.lucas.spring.components.procedure.model.model.ProcedureResultFileRequest;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
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
   * TODO: This endpoint is not called from the frontend yet.
   * An endpoint to upload image information to the db.
   *
   * @param request The image object we want to push to the db.
   */
  @CrossOrigin
  @PostMapping("/save-image")
  public void postNewImage(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody final ImageRequest request
  ) {
    final Optional<ImageEntity> imageToUpload = imageFacadeService.getImageEntity(request);
    imageToUpload.ifPresent(
            imageEntity -> exifFacadeService.saveImageExifHeader(
                    request.getExifData(),
                    imageEntity)
    );
  }

  /**
   * An endpoint to apply filters on the image table.
   * Filter images by the provided query builder, while giving back only the
   * necessary length of records from the db based on the values of the {@link Pageable}.
   *
   * @param user The user who initialized the connection to the server.
   * @param request The request containing the filters.
   * @return Returns a {@link PageableResponse} that contains the list of images that are
   *     satisfying the query builder, and only giving back a limited number of them based on
   *     the value of the {@link Pageable}, while converting the result
   *     {@link ImageEntity} into {@link ImageDto}.
   */
  @CrossOrigin
  @PostMapping("/filter-images")
  public PageableResponse<ImageDto> postQueryBuilderImage(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestHeader(ApplicationConstants.PAGEABLE_PROPERTIES) Pageable pageable,
          @RequestBody FilteringQueryRequest request
  ) {
    return conversionHelper.convertPage(
            imageFilterService.filterImages(request, pageable),
            ImageDto.class);
  }

  /**
   * Retrieves an images based on the provided image names and creation years.
   *
   * @param user The user who initialized the connection to the server.
   * @param filesRequest The list of image files, where the name of the image and the
   *                    creation year is provided for the purpose of fetching the
   *                    image urls from the db.
   * @return Returns the images.
   */
  @CrossOrigin
  @PostMapping("/")
  public List<ImageDto> postImageByImageNameAndCreationYear(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser user,
          @RequestBody ProcedureResultFileRequest filesRequest
  ) {
    return conversionHelper.convertList(
            imageService.getImagesByProcedureFiles(filesRequest.getFiles()),
            ImageDto.class);
  }
}
