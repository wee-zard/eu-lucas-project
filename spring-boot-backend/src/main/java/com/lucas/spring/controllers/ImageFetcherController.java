package com.lucas.spring.controllers;

import com.lucas.spring.model.models.AuthenticatedUser;
import com.lucas.spring.model.response.BaseResponse;
import com.lucas.spring.services.facade.ImageFetcherFacade;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
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
  @Value("${lucasRemoteImageServerPath}")
  private String lucasRemoteImageServerPath;
  private final ImageFetcherFacade imageFetcherFacade;

  /**
   * Init constructor.
   *
   * @param imageFetcherFacade Image Fetcher Facade Service.
   */
  public ImageFetcherController(final ImageFetcherFacade imageFetcherFacade) {
    this.imageFetcherFacade = imageFetcherFacade;
  }

  /**
   * // TODO: This method is not called on the frontend yet.
   * Request the server to scalp the lucas remote image server and get
   * every information of the images stored in that website and store
   * them in the db without duplicated images.
   *
   * @param authenticatedUser The authenticated user who initiated the request.
   */
  @CrossOrigin
  @PostMapping("/")
  public BaseResponse postValidateEmailAddress(
          @RequestHeader(HttpHeaders.AUTHORIZATION) AuthenticatedUser authenticatedUser
  ) {
    /*
     * TODO: The user should be able to set which images they want to download
     *  and upload them to the db, such as they want to download only the Hungarian
     *  related images (instead of downloading every country's images).
     */
    imageFetcherFacade.scalpLucasImageServer(lucasRemoteImageServerPath);
    System.out.print("Uploading image data have been finished!");
    return new BaseResponse();
  }
}
