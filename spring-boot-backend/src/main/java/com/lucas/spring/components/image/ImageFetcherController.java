package com.lucas.spring.components.image;

import com.lucas.spring.commons.model.model.AuthenticatedUser;
import com.lucas.spring.commons.model.model.ResourceModel;
import com.lucas.spring.commons.model.response.BaseResponse;
import com.lucas.spring.commons.model.response.PageableResponse;
import com.lucas.spring.commons.services.CustomConversionService;
import com.lucas.spring.commons.utils.ResourceUtil;
import com.lucas.spring.components.image.facade.ImageFetcherFacade;
import com.lucas.spring.components.image.facade.ImageHeaderExtractionFacade;
import com.lucas.spring.components.image.model.dto.ImageDto;
import com.lucas.spring.components.image.service.ImageService;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Stores the endpoints related to the image fetching
 * from the remote image server for the purpose of updating
 * the db with the new images and their information.
 */
@RestController
@RequestMapping(path = "api/fetcher")
public class ImageFetcherController {
  @Value("${lucasRemoteImageServerPath}") private String lucasRemoteImageServerPath;
  private final ImageFetcherFacade imageFetcherFacade;
  private final ImageHeaderExtractionFacade imageHeaderExtractionFacade;
  private final CustomConversionService conversionService;
  private final ImageService imageService;

  /**
   * Init constructor.
   *
   * @param imageFetcherFacade Image Fetcher Facade Service.
   */
  public ImageFetcherController(
          final ImageFetcherFacade imageFetcherFacade,
          final ImageHeaderExtractionFacade imageHeaderExtractionFacade,
          final CustomConversionService conversionService,
          final ImageService imageService
  ) {
    this.imageFetcherFacade = imageFetcherFacade;
    this.imageHeaderExtractionFacade = imageHeaderExtractionFacade;
    this.conversionService = conversionService;
    this.imageService = imageService;
  }

  /**
   * // TODO: This method is not called on the frontend yet.
   * Request the server to scalp the lucas remote image server and get
   * every information of the images stored in that website and store
   * them in the db without duplicated images.
   *
   * @param user The authenticated user who initiated the request.
   */
  @CrossOrigin
  @PostMapping("/")
  public BaseResponse validate(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user
  ) {
    /*
     * TODO: The user should be able to set which images they want to download
     *  and upload them to the db, such as they want to download only the Hungarian
     *  related images (instead of downloading every country's images).
     */
    imageFetcherFacade.scalpLucasImageServer(lucasRemoteImageServerPath, user);
    return new BaseResponse();
  }

  /**
   * // TODO: This method is not called on the frontend yet.
   * Request the server to scalp the lucas remote image server and get
   * every exif information extracted from the images, and upload them to the db.
   *
   * @param user The authenticated user who initiated the request.
   */
  @CrossOrigin
  @PostMapping("/extract-image-headers")
  public BaseResponse extractImageHeaders(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user
  ) {
    imageHeaderExtractionFacade.scalpLucasImageServer(user);
    return new BaseResponse();
  }

  /**
   * Download image from specific url and converts it into a base64string.
   *
   * @param user The authenticated user who initiated the request.
   * @param urls The url to download.
   * @return Returns a base64string version of the requested url resource.
   */
  @CrossOrigin
  @PostMapping(value  = "/download-image")
  public String downloadImage(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user,
          @RequestBody final String[] urls
  ) {
    return ResourceUtil.urlToBase64(urls[0]);
  }

  /**
   * Retrieves random images from the server.
   *
   * @param user The user who initialized the connection to the server.
   * @return Returns a list of random images from the server.
   */
  @CrossOrigin
  @GetMapping("/random")
  public PageableResponse<ImageDto> getRandomImages(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user
  ) {
    return conversionService.convert(imageService.getRandomImages(), ImageDto.class);
  }

  /**
   * Retrieves the local image server files from the resources directory.
   *
   * @param user The user who initialized the connection to the server.
   * @return Returns a list of filenames and base64strings of the retrieved files.
   */
  @CrossOrigin
  @GetMapping("/image-server")
  public List<ResourceModel> getLocalImageServer(
          @RequestHeader(HttpHeaders.AUTHORIZATION) final AuthenticatedUser user
  ) {
    return ResourceUtil.getResourceModels("localImageServer");
  }
}
